<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="报表类型"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-select
            v-decorator="[
          'level',
          { rules: [{ required: true, message: '请选择报表类型!' }] },
        ]"
          >
<!--            <a-select-option value="alert" v-if="isTotal">-->
<!--              警报-->
<!--            </a-select-option>-->
            <a-select-option value="total" v-if="isTotal">
              全部直播
            </a-select-option>
            <a-select-option value="branch" v-if="isBranch">
              分区
            </a-select-option>
            <a-select-option value="group" v-if="isGroup">
              大组
            </a-select-option>
            <a-select-option value="team">
              小组
            </a-select-option>
            <a-select-option value="anchor">
              主播
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="层级编号"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <div>
            <a-input v-model="levelId" v-decorator="['levelId']"></a-input>
          </div>
        </a-form-item>
        <a-form-item
          label="统计月份"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        >
          <a-month-picker
            :format="monthFormat"
            v-decorator="[
            'moment',
            {rules: [{ required: true, message: '请选择统计月份' }]}]"></a-month-picker>
        </a-form-item>
        <a-form-item
          label="报表格式"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="true"
        >
          <a-radio-group
            v-model="value"
            v-decorator="['type']"
          >
            <a-radio :value="1">excel</a-radio>
            <a-radio :value="2">pdf</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="value===2"
          label="报表密码"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :required="false"
        >
          <a-input-password v-decorator="['password']" placeholder="不输入则默认无密码" />
        </a-form-item>
        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button htmlType="submit" type="primary">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-modal
      title="报表下载"
      v-model="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-spin :spinning="spinning"/>
      <a v-if="fileLink" :href="fileLink" target="_blank" @click="handleDownload" id='downloadLink'>{{ fileDone }}</a>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { getReportFile } from '../../api/LBMSmanage'

const plainOptions = ['工位1', '工位2', '工位3', '...']
const defaultCheckedList = ['工位1', '工位3']
const date = new Date()
export default {
  name: 'ReportForm',
  data () {
    return {
      isTotal: this.$store.state.user.roleNum <= 1,
      isBranch: this.$store.state.user.roleNum <= 2,
      isGroup: this.$store.state.user.roleNum <= 3,
      levelId: null,
      spinning: false,
      fileLink: null,
      fileDone: '',
      visible: false,
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      monthFormat: 'YYYY/MM',
      plainOptions,
      value: 1,
      // form
      form: this.$form.createForm(this)
    }
  },
  methods: {
    moment,
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.visible = true
          this.spinning = true
          values.type = values.type === 1 ? 'excel' : 'pdf'
          values.datetimeStr = values.moment.format("YYYY-MM-DD")
          delete values.moment
          getReportFile(values).then(res => {
            this.spinning = false
            this.fileDone = '报表已生成, 点击下载或查看'
            console.log(res.data)
            this.fileLink = res.data
          }).catch(err => {
            this.$message.error('权限不足')
            this.visible = false
          })
        }
      })
    },
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    handleCancel (e) {
      this.visible = false
    },
    handleDownload () {
      this.fileDone = ''
      this.visible = false
    },
    handleOk () {
      document.getElementById('downloadLink').click()
      this.fileDone = ''
      this.visible = false
    }
  }
}
</script>
