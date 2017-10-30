<template>
  <div class="coreApply">
    <div style="margin-bottom: 0.3rem">为什么要成为律师说平台的<router-link :to="{ name: 'desc' }">核心律师</router-link>？</div>
    <el-form ref="form" :model="form" :rules="rules" :label-position="labelPosition" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input type="tel" v-model.number="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="专业方向" prop="profession">
        <el-input v-model="form.profession"></el-input>
      </el-form-item>
      <el-form-item label="执业地区" prop="area">
        <el-input v-model="form.area" icon="search" :on-icon-click="handleIconClick">
          
        </el-input>
      </el-form-item>
      <el-form-item label="个人信息">
        <el-input type="textarea" :rows="rows" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="个人主页或自媒体账号">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(form)" class="prompt">提交</el-button>
      </el-form-item>
    </el-form>
    <mt-popup
      v-model="popupVisible"
      position="bottom" class="popups">
      <div class="btn flex flex-pack-justify">
        <el-button @click='cancel'>取消</el-button>
        <el-button type="info" @click="sure">确认</el-button>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  export default{
    name:'coreApply',
    data () {
      var checkTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('手机号只能是数字'));
          } else {
            var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
            if (!reg.test(value)) {
              callback(new Error('手机号格式不对'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        popupVisible: false,
        rows: 4,
        allCity:[],
        value1: '',
        value2: '',
        value0: '',
        idx: '',
        addr: '',
        showArea: true,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '',
            className: 'slot4'
          },
           {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        labelPosition: 'top',
        form: {
          desc: '',
          name: '',
          link: '',
          area: '',
          tel: '',
          profession: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          tel: [
            { validator: checkTel, required: true, trigger: 'blur' }
          ],
          profession: [
            { required: true, message: '请输入专业', trigger: 'blur' },
            { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '请输入地区', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      cancel () {
        this.popupVisible = false
      },
      sure () {
        this.popupVisible = false
      },
      handleIconClick () {
        this.popupVisible = true
      },
      submitForm(formName) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.prompt()
          } else {
            return false;
          }
        });
      },
      prompt () {
        Indicator.open()
        var para = {
          name: this.form.name,
          phone: this.form.tel,
          profession: this.form.profession,
          area: this.form.area,
          info: this.form.desc,
          homepage: this.form.link
        }
        para = Qs.stringify(para)
        axios.post('user/applysigin', para)
        .then(res => {
          Toast(res.data.message)
          if (res.data.isSuc) {
            this.$router.push({ name: 'applysuc' })
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      onValuesChange(picker, values) {
        this.value0 = values[0]
        this.value1 = values[1]
        this.value2 = values[2]
        this.form.area = picker.getValues().join('/')
      },
      getCity () {
        axios.get('Company/get_province_list')
        .then(res => {
          this.allCity = res.data.result
          this.allCity.forEach((val, index) => {
            this.slots[0].values.push(val.Province)
          })
          this.allCity[0].CityList.forEach((val, index1) => {
            this.slots[2].values.push(val.City)
          })
          this.allCity[0].CityList[0].DistrictList.forEach((val, index2) => {
            this.slots[4].values.push(val.Area)
          })
        })
        .catch(err => {
          Toast(err)
        })
      }
    },
    watch: {
      value0 () {
        if (!this.allCity) {
          return
        }
        this.allCity.forEach((val, index) => {
          if (this.value0 == val.Province) {
            this.slots[2].values = []
            this.slots[4].values = []
            this.idx = index
            this.allCity[index].CityList.forEach((val, index1) => {
              this.slots[2].values.push(val.City)
            })
            this.allCity[index].CityList[0].DistrictList.forEach((val, index2) => {
              this.slots[4].values.push(val.Area)
            })
          }
        })
      },
      value1 () {
        if (!this.value1) {
          return
        }
        if (!this.allCity[this.idx].CityList) {
          return
        }
        this.allCity[this.idx].CityList.forEach((val, index) => {
          if (this.value1 == val.City ) {
            this.slots[4].values = []
            this.allCity[this.idx].CityList[index].DistrictList.forEach((val, index1) => {
              this.slots[4].values.push(val.Area)
            })
          }
        })
      },
      value2 () {},
      addr () {}
    },
    mounted () {
      this.getCity()
    }
  }
</script>
<style scoped="scoped">
  .prompt.el-button{
    width: 100%
  }
  .coreApply{
    padding: 0.3rem;
  }
  .popups.mint-popup {
    width: 100%
  }
  .btn {
    padding: 0.3rem;
  }
</style>