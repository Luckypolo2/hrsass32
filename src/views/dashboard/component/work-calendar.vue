<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width:120px" @change="dateChanged">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width:120px" @change="dateChanged">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDay">
      <template v-slot:dateCell="{ date, data }" class="content">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'WorkCalendar',
  filters: {
    getDay(value) {
      return value.split('-')[2]
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      yearList: [],
      currentYear: null,
      currentMonth: null,
      currentDay: null
    }
  },
  created() {
    this.currentMonth = this.startDate.getMonth() + 1
    this.currentYear = this.startDate.getFullYear()
    this.yearList = Array.from(Array(11), (v, i) => this.currentYear + i - 5) // Array.from从数组中新生成一个数组
    this.dateChanged()
  },
  methods: {
    dateChanged() {
      this.currentDay = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0 // 周六周日返回true
    }
  }
}
</script>

<style  scoped>
/deep/ .el-calendar-day {
  height:  auto;
}
/deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;

}
/deep/ .el-calendar-table td.is-selected .text{
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
/deep/ .el-calendar__header {
  display: none
}
</style>
