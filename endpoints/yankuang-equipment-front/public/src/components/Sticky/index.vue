<template>
    <div class="app-container" style="width:100%">
      <div class="filter-container" style="width:100%">
        <el-input @keyup.enter.native="handleFilter" style="width: 150px;float:left;" class="filter-item" placeholder="设备名称" v-model="listQuery.title">
        </el-input>
        <el-select v-model="value" placeholder="所属中心" style="width: 150px;float:left;margin-left:20px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" v-waves icon="el-icon-refresh" @click="reset">重置</el-button>
        <div class="btn_right">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-circle-plus-outline" @click="handleCreate">添加</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-edit" @click="handleFilter">编辑</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="danger" v-waves icon="el-icon-delete" @click.prevent="delData()">删除</el-button>
        </div>
      </div>
      <el-table :key='tableKey' :data="tableData3" border fit highlight-current-row
      style="width: 100%;" height="720px" @selection-change='selectRow' ref="moviesTable" v-loading="listLoading">
      <el-table-column align="center" label="设备名称" width="300px">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="设备识别码">
        <template slot-scope="scope">
          <span class="link-type" align="center" @click="handleUpdate(scope.row)">{{scope.row.icon}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="'规格型号'">
        <template slot-scope="scope">
          <span>{{scope.row.value7}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('所属公司')">
        <template slot-scope="scope">
          <span>{{scope.row.value2}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('到货日期')">
        <template slot-scope="scope">
          <span>{{scope.row.arrivedata}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('启用日期')">
        <template slot-scope="scope">
          <span>{{scope.row.opendate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('是否全新')">
        <template slot-scope="scope">
          <span>{{scope.row.new}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('仓库')">
        <template slot-scope="scope">
          <span>{{scope.row.warehouse}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('单价')">
        <template slot-scope="scope">
          <span>{{scope.row.phvallue}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('购置价值')">
        <template slot-scope="scope">
          <span>{{scope.row.unitprice}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加的弹出窗部分 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="90%" >
      <div style="float:left;">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 300px; margin-left:50px;'>
          <el-form-item :label="'设备名称:'" label-width="120px" required>
            <el-input v-model="temp.name"></el-input>
          </el-form-item>
          <el-form-item :label="'大类:'" label-width="120px" required>
            <el-select v-model="temp.value1" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="'技术识别码:'" label-width="120px" required>
            <el-input v-model="temp.icon"></el-input>
          </el-form-item>
          <el-form-item :label="'出厂编码:'" label-width="120px">
            <el-input v-model="temp.outcode"></el-input>
          </el-form-item>
          <el-form-item :label="'MA有效期止:'" label-width="120px">
            <el-input v-model="temp.ontime"></el-input>
          </el-form-item>
          <el-form-item :label="'生产许可证:'" label-width="120px">
            <el-input v-model="temp.allow"></el-input>
          </el-form-item>
          <el-form-item :label="'所属公司:'" label-width="120px">
            <el-select v-model="temp.value2" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="'是否全新:'" label-width="120px" required>
            <el-select v-model="temp.value3" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="'是否开启rfid:'" label-width="120px" required>
            <el-select v-model="temp.value4" placeholder="请选择">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div style="float:left;">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 300px; margin-left:50px;'>
          <el-form-item :label="'是否租赁:'" label-width="120px" required>
              <el-select v-model="temp.value5" placeholder="请选择">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item :label="'中类:'" label-width="120px" required>
              <el-select v-model="temp.value6" placeholder="请选择">
                <el-option
                  v-for="item in options6"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="'生产厂家:'" label-width="120px" required>
            <el-input v-model="temp.manufacturer"></el-input>
          </el-form-item>
          <el-form-item :label="'MA证编号:'" label-width="120px">
            <el-input v-model="temp.number"></el-input>
          </el-form-item>
          <el-form-item :label="'防爆证书:'" label-width="120px">
            <el-input v-model="temp.certificate"></el-input>
          </el-form-item>
          <el-form-item :label="'到货日期:'" label-width="120px">
            <el-date-picker
              v-model="temp.arrivedata"
              type="date"
              placeholder="选择日期" style="width:180px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="'合同号:'" label-width="120px">
            <el-input v-model="temp.contractno"></el-input>
          </el-form-item>
          <el-form-item required :label="'仓库:'" label-width="120px" >
            <el-input v-model="temp.warehouse"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="float:left;">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 300px; margin-left:50px;'>
          <el-form-item :label="'规格型号:'" label-width="120px" required>
              <el-select v-model="temp.value7" placeholder="请选择">
                <el-option
                  v-for="item in options7"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item :label="'小类:'" label-width="120px" required>
              <el-select v-model="temp.value8" placeholder="请选择">
                <el-option
                  v-for="item in options8"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="'出场日期:'" label-width="120px">
            <el-date-picker
              v-model="temp.outdate"
              type="date"
              placeholder="选择日期" style="width:180px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="'MA有效期起:'" label-width="120px">
            <el-date-picker
              v-model="temp.madate"
              type="date"
              placeholder="选择日期" style="width:180px;">
            </el-date-picker>
          </el-form-item>
            <el-form-item :label="'防爆证书编号:'" label-width="120px">
            <el-input v-model="temp.proofcode"></el-input>
          </el-form-item>
          <el-form-item :label="'启用日期:'" label-width="120px" required>
            <el-date-picker
              v-model="temp.opendate"
              type="date"
              placeholder="选择日期" style="width:180px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="'购置价值:'" label-width="120px" required>
            <el-input-number v-model="temp.phvallue" controls-position="right" @change="handleChange" :min="1" :max="99999"></el-input-number>
          </el-form-item>
          <el-form-item :label="'单价:'" label-width="120px">
            <el-input-number v-model="temp.unitprice" controls-position="right" @change="handleChange" :min="1" :max="99999"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div style="clear:both;"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </div>
    </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import editorImage from './components/editorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import { parseTime } from '@/utils'
// import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      options1: [{
        value: '选项1',
        label: '通用机电设备'
      }, {
        value: '选项2',
        label: '通用设备'
      }],
      options2: [{
        value: '选项1',
        label: '设备管理中心'
      }, {
        value: '选项2',
        label: '通用设备中心'
      }],
      options3: [{
        value: '选项1',
        label: '是'
      }, {
        value: '选项2',
        label: '否'
      }, {
        value: '选项3',
        label: '周转'
      }],
      options4: [{
        value: '选项1',
        label: '是'
      }, {
        value: '选项2',
        label: '否'
      }],
      options5: [{
        value: '选项1',
        label: '租赁'
      }, {
        value: '选项2',
        label: '不租赁'
      }],
      options6: [{
        value: '选项1',
        label: '引用水泵'
      }, {
        value: '选项2',
        label: '引用水泵'
      }],
      options7: [{
        value: '选项1',
        label: '123'
      }, {
        value: '选项2',
        label: '1234'
      }],
      options8: [{
        value: '选项1',
        label: '排沙减污泵'
      }, {
        value: '选项2',
        label: '排沙减污泵'
      }],
      statusOptions: ['中心', '矿处'],
      statusOptions1: ['中心1', '矿处1'],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加设备'
      },
      dialogPvVisible: false,
      tableKey: 0,
      options: [{
        value: '选项1',
        label: '所属中心'
      }, {
        value: '选项2',
        label: '设备管理中心'
      }
      ],
      value: '所属公司',
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      fullscreen: false,
      ss: 11,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      tableData3: [{
        id: 1,
        name: '王小虎', // 设备名称
        value1: '通用机电设备', // 大类
        icon: '123', // 技术识别码
        outcode: '', // 出场编码
        ontime: '',
        allow: '',
        value2: '设备管理中心', // 所属公司
        value3: '周转', // 是否全新
        value4: '是', // 是否开启rfid
        value5: '租赁', // 是否租赁
        value6: '', // 中类
        value7: '', // 规格型号
        value8: '', // 小类
        manufacturer: '', // 生产厂家
        number: '', // 编号
        certificate: '', // 防爆证书
        arrivedata: '', // 到货日期
        contractno: '', // 合同号
        warehouse: '', // 仓库
        outdate: '', // 出厂日期
        madate: '', // MA有效期
        proofcode: '', // 防爆证书编号
        opendate: '', // 启用日期
        phvallue: '', // 购置价值
        unitprice: ''
      }, {
        id: 2,
        name: '王小虎', // 设备名称
        value1: '通用机电设备', // 大类
        icon: '234', // 技术识别码
        outcode: '', // 出场编码
        ontime: '',
        allow: '',
        value2: '设备管理中心', // 所属公司
        value3: '周转', // 是否全新
        value4: '是', // 是否开启rfid
        value5: '租赁', // 是否租赁
        value6: '', // 中类
        value7: '', // 规格型号
        value8: '', // 小类
        manufacturer: '', // 生产厂家
        number: '', // 编号
        certificate: '', // 防爆证书
        arrivedata: '', // 到货日期
        contractno: '', // 合同号
        warehouse: '', // 仓库
        outdate: '', // 出厂日期
        madate: '', // MA有效期
        proofcode: '', // 防爆证书编号
        opendate: '', // 启用日期
        phvallue: '', // 购置价值
        unitprice: ''
      }, {
        id: 3,
        name: '王小虎', // 设备名称
        value1: '通用机电设备', // 大类
        icon: '1234', // 技术识别码
        outcode: '', // 出场编码
        ontime: '',
        allow: '',
        value2: '设备管理中心', // 所属公司
        value3: '周转', // 是否全新
        value4: '是', // 是否开启rfid
        value5: '租赁', // 是否租赁
        value6: '', // 中类
        value7: '', // 规格型号
        value8: '', // 小类
        manufacturer: '', // 生产厂家
        number: '', // 编号
        certificate: '', // 防爆证书
        arrivedata: '', // 到货日期
        contractno: '', // 合同号
        warehouse: '', // 仓库
        outdate: '', // 出厂日期
        madate: '', // MA有效期
        proofcode: '', // 防爆证书编号
        opendate: '', // 启用日期
        phvallue: '', // 购置价值
        unitprice: ''
      }],
      temp: {
        name: '', // 设备名称
        value1: '通用机电设备', // 大类
        icon: '', // 技术识别码
        outcode: '', // 出场编码
        ontime: '',
        allow: '',
        value2: '设备管理中心', // 所属公司
        value3: '周转', // 是否全新
        value4: '是', // 是否开启rfid
        value5: '租赁', // 是否租赁
        value6: '', // 中类
        value7: '', // 规格型号
        value8: '', // 小类
        manufacturer: '', // 生产厂家
        number: '', // 编号
        certificate: '', // 防爆证书
        arrivedata: '', // 到货日期
        contractno: '', // 合同号
        warehouse: '', // 仓库
        outdate: '', // 出厂日期
        madate: '', // MA有效期
        proofcode: '', // 防爆证书编号
        opendate: '', // 启用日期
        phvallue: '', // 购置价值
        unitprice: '', // 单价
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: '',
        status1: ''
      }
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    },
    selectRow(val) {
      this.selectlistRow = val
    },
    delData() {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        const val = this.selectlistRow
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.tableData3.forEach((v, i) => {
            if (val.id === v.id) {
              // i 为选中的索引
              this.tableData3.splice(i, 1)
            }
          })
        })
        break
      }
      // 删除完数据之后清除勾选框
      // this.$refs.tableData3.clearSelection()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: '',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addRow() {
      var list = {
        rowNum: '',
        address: this.address,
        name: this.name,
        weather: this.weather,
        phone: this.phone,
        date: this.date,
        mdate: this.mdate,
        loveer: this.loveer
      }
      this.tableData3.unshift(list)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'yankuang-equipment-front'
          createArticle(this.temp).then(() => {
            this.tableData3.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.tableData3) {
              if (v.id === this.temp.id) {
                const index = this.tableData3.indexOf(v)
                this.tableData3.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.tableData3.indexOf(row)
      this.tableData3.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleChange(value) { // 改变单价
      console.log(value)
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
