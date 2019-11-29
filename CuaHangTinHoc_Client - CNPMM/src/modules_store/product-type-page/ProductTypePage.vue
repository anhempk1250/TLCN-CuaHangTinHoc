<template>
  <div>
    <div class="row" style="background-color: #e9ebea;margin:0;padding: 1rem;">
      <h5 class="text-left" style="margin-top:0.5rem;color:#307ECC">Danh sách loại sản phẩm</h5>
    </div>
    <div class="row" style="margin-top: 1rem">
      <div class="col-12 col-md-6">
        <input class="form-control" placeholder="tìm kiếm" />
      </div>
      <div class="col-12 col-md-2">
        <button class="btn btn-primary">
          <i class="fa fa-search"></i> Tìm kiếm
        </button>
      </div>
    </div>
    <div class="row" style="margin-top: 1.5rem;">
      <div class="col-12 col-md-6">
        <div class="row" style="margin-bottom: 0.5rem">
          <div class="col-12 col-md-4">
            <select class="form-control">
              <option selected>-- Danh mục --</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div class="col-12 col-md-4">
            <input placeholder="tên loại" class="form-control" />
          </div>
          <div class="col-12 col-md-4">
            <button class="btn btn-primary">
              <i data-v-005d82db class="fa fa-plus" aria-hidden="true"></i> Loại sản phẩm
            </button>
          </div>
        </div>
        <b-table :fields="fieldsProductType"></b-table>
        <b-pagination style="position:absolute;right:1rem"></b-pagination>
      </div>
      <div class="col-12 col-md-6">
        <div class="row" style="margin-bottom: 0.5rem">
          <div class="col-12 col-md-8">
            <input class="form-control" placeholder="Nhập mã sản phẩm" />
          </div>
          <div class="col-12 col-md-4">
            <button class="btn btn-primary">
              <i class="fa fa-plus"></i> Sản phẩm
            </button>
          </div>
        </div>
        <b-table sticky-header :fields="fieldsProductOfType"></b-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      fieldsProductType: [
        { key: "STT", label: "STT" },
        { key: "id", label: "Mã loại sản phẩm" },
        { key: "name", label: "Tên loại sản phẩm" },
        { key: "control", label: "" }
      ],
      fieldsProductOfType: [
        { key: "STT", label: "STT" },
        { key: "id", label: "Mã sản phẩm" },
        { key: "name", label: "Tên sản phẩm" },
        { key: "control", label: "" }
      ]
    };
  },
  methods: {
    submit() {
      /**$.post('http://localhost:8000/testNe', {id: '123'}, function(data){
        console.log(data);
      }) */
      axios
        .post(
          "http://localhost:8000/testNe",
          { id: "123" },
          { prams: { id: "123" } }
        )
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
</style>