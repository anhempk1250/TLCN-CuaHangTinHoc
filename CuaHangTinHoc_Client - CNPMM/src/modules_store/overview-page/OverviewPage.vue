<template>
  <div>
    <h4 style="color: blue;">Hoạt Động Hôm Nay</h4>
    <div class="row myRow">
      <div class="col-md-3 hd">
        <h4>Hoạt động</h4>
        <hr />
        <p>
          Số tiền bán hàng :
          <span>0đ</span>
        </p>
        <p>
          Số đơn hàng :
          <span>0</span>
        </p>
        <p>
          Số sản phẩm :
          <span>0</span>
        </p>
        <button class="btn btn-info">Chi tiết</button>
      </div>
      <div class="col-md-3 offset-md-1 sp">
        <h4>Thông tin sản phẩm</h4>
        <hr />
        <p>
          Số lượng sản phẩm :
          <span>100</span>
        </p>
        <p>
          Có khuyến mãi :
          <span>10</span>
        </p>
        <p>
          Hàng chưa phân loại :
          <span>10</span>
        </p>
        <button class="btn btn-warning">Chi tiết</button>
      </div>
      <div class="col-md-3 offset-md-1 kho">
        <h4>Thông tin kho</h4>
        <hr />
        <p>
          Sản phẩm hết hàng :
          <span>0</span>
        </p>
        <p>
          Sản phẩm sắp hết hàng:
          <span>0</span>
        </p>
        <button class="btn btn-success">Chi tiết</button>
      </div>
    </div>
    <div class="row" style="margin:0;margin-top: 1.5rem;">
      <h4 style="color:blue">Biểu đồ doanh thu hàng tháng</h4>
      <div class="col">
        <div class="row">
          <label class="col-md-1" style="padding-top:0.5rem;">
            Tháng :
          </label>
          <select class="form-control col-md-1" style="margin-right: 0.5rem;"> 
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
            <input class="form-control col-md-1"  placeholder="năm" style="margin-right: 0.5rem;">
            <button class="btn btn-primary">Tìm</button>
        </div>
        <apexchart width="1000" height="500" type="line" :options="options" :series="series"></apexchart>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [
            "Ngày 1",
            "Ngày 2",
            "Ngày 3",
            "Ngày 4",
            "Ngày 5",
            "Ngày 6",
            "Ngày 7",
            "Ngày 8",
            "Ngày 9",
            "Ngày 10",
            "Ngày 11",
            "Ngày 12",
            "Ngày 13",
            "Ngày 14",
            "Ngày 15",
            "Ngày 16",
            "Ngày 17",
            "Ngày 18",
            "Ngày 19",
            "Ngày 20",
            "Ngày 21",
            "Ngày 22",
            "Ngày 23",
            "Ngày 24",
            "Ngày 25",
            "Ngày 26",
            "Ngày 27",
            "Ngày 28",
            "Ngày 29",
            "Ngày 30",
            "Ngày 31"
          ]
        }
      },
      series: [
        {
          name: "doanh thu",
          data: [
            30,
            40,
            45,
            30,
            40,
            45,
            50,
            49,
            60,
            70,
            30,
            40,
            45,
            50,
            49,
            60,
            70,
            30,
            40,
            45,
            50,
            49,
            60,
            70,
            30,
            40,
            45,
            50,
            49,
            60,
            70
          ]
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.row {
  margin-bottom: 1.5rem;
}
.myRow {
  background-color: #cad1ca;
  margin: 0;
  padding: 1.5rem 1rem;
  .col-md-3 {
    background-color: white;
    padding: 1rem;
    h4 {
      font-weight: bold;
      font-size: 24px;
    }
    span {
      position: absolute;
      right: 1rem;
      text-decoration: underline;
    }
  }
  .hd {
    border: 2px solid skyblue;
    margin-left: 2.5rem;
  }
  .kho {
    border: 2px solid yellowgreen;
  }
  .sp {
    border: 2px solid orange;
  }
}
</style>