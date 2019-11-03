<template>
  <div>
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="Thông tin tài khoản" title-item-class="text-left"  active>
          <b-card-text>
            <tabInfo />
          </b-card-text>
        </b-tab>
        <b-tab title="Quản lý đơn hàng" title-item-class="text-left">
          <b-card-text><tabOrderManage/></b-card-text>
        </b-tab>
        <b-tab title="Nhận xét sản phẩm đã mua" title-item-class="text-left">
          <tabComment/>
        </b-tab>
        <b-tab title="Nhận xét của tôi" title-item-class="text-left">
          <tabCommentHistory/>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import tabInfo from "../../components/mypage_tab_info/MyPageTabInfo.vue";
import tabOrderManage from '../../components/mypage_tab_order_manage/MyPageTabOrderManage.vue'
import tabComment from '../../components/mypage_tab_comment/MyPageTabComment'
import tabCommentHistory from '../../components/mypage_tab_comment_history/MyPageCommentHistory.vue'
export default {
  components: { tabInfo, tabOrderManage, tabComment, tabCommentHistory }
};
</script>
<style scoped>
</style>