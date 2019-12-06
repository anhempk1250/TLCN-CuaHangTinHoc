<template>
  <div v-if="!this.$route.query.user">
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="Thông tin tài khoản" title-item-class="text-left" active>
          <tabInfo :customer="customerAccountObject" />
        </b-tab>
        <b-tab
          @click="loadOrderList()"
          :active="this.$route.query.order!=true"
          title="Quản lý đơn hàng"
          title-item-class="text-left"
        >
          <tabOrderManage />
        </b-tab>
        <b-tab @click="loadOrderSuccessList()" title="Nhận xét sản phẩm đã mua" title-item-class="text-left">
          <tabComment />
        </b-tab>
        <b-tab @click="loadCommentList()" title="Nhận xét của tôi" title-item-class="text-left">
          <tabCommentHistory />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import tabInfo from "../../components/mypage_tab_info/MyPageTabInfo.vue";
import tabOrderManage from "../../components/mypage_tab_order_manage/MyPageTabOrderManage.vue";
import tabComment from "../../components/mypage_tab_comment/MyPageTabComment";
import tabCommentHistory from "../../components/mypage_tab_comment_history/MyPageCommentHistory.vue";
import { mapGetters } from "vuex";

export default {
  components: { tabInfo, tabOrderManage, tabComment, tabCommentHistory },
  computed: {
    ...mapGetters({
      customerAccountObject: "customerAccountObject",
      customerAccountLoading: "customerAccountLoading"
    })
  },
  methods: {
    handleGetCusInfo(response) {
      if (response.data.errorToken) {
        this.$swal({
          title: "Thông báo",
          text: response.data.msg
        });
        if (localStorage.ctoken) localStorage.removeItem("ctoken");
        this.$router.push({ name: "home-page" });
      } else {
        localStorage.cname = this.customerAccountObject.name;
      }
    },
    loadOrderList() {
      this.$store.dispatch("getCustomerOrder");
    },
    loadOrderSuccessList() {
      this.$store.dispatch('getCustomerOrderSuccess')
    },
    loadCommentList() {

    }
  },
  created() {
    if (this.$route.query.user) {
      this.$swal({
        timer: 2000,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        }
      });
      let user = JSON.parse(this.$route.query.user);
      let vm = this;
      this.$store.dispatch("customerLoginSocial", user).then(response => {
        if (response.data.token) {
          localStorage.ctoken = response.data.token;
          localStorage.cname = response.data.user.name;
          vm.$router.push("/mypage");
        }
      });
    } else {
      this.$store
        .dispatch("checkLoginCustomer")
        .then(response => this.handleGetCusInfo(response));
    }
  }
};
</script>
<style scoped>
</style>