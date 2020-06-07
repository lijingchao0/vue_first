<template>
<div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
        <el-row>
            <el-col>
                <el-button type='primary'>添加角色</el-button>
            </el-col>
        </el-row>
        <el-table :data='rolesList' border stripe>
            <el-table-column type='expand'>
                <template slot-scope="scope">
                    <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
                        <!-- 一级权限 -->
                        <el-col :span='5'>
                            <el-tag closable @close="handleClose(item1.id, scope.row)">{{item1.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <el-col :span='19'>
                            <el-row :class="[ i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                                <!-- 一级权限 -->
                                <el-col :span='6'>
                                    <el-tag closable @close="handleClose(item2.id, scope.row)" type='success'>{{item2.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span='18'>
                                    <el-tag closable @close="handleClose(item3.id, scope.row)" type='warning' v-for="(item3) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>

                </template>
            </el-table-column>close
            <el-table-column label="#" type='index'></el-table-column>
            <el-table-column label="角色名称" prop='roleName'></el-table-column>
            <el-table-column label="角色描述" prop='roleDesc'></el-table-column>
            <el-table-column label="操作" width='300'>
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size='mini'>编辑{{scope.row.id}}</el-button>
                    <el-button type="danger" icon="el-icon-delete" size='mini'>删除</el-button>
                    <el-button type="warning" icon="el-icon-setting" size='mini' @click="showSetDialogVisible(scope.row)">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 分配权限弹窗 -->
    <el-dialog title="分配权限" :visible.sync="setDialogVisible" width="50%" @close='setDialogClose'>
        <el-tree :data="rightslist" :props="defaultProps" ref="treeRef" show-checkbox node-key='id' default-expand-all :default-checked-keys='defkeys'></el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            rolesList: [],
            setDialogVisible: false,
            rightslist: [],
            defaultProps: {
                children: 'children',
                label: 'authName'
            },
            defkeys: [],
            rolesId: ''
        }
    },
    created() {
        this.getRolesList()
    },
    methods: {
        async getRolesList() {
            const {
                data: res
            } = await this.$http.get('roles')
            if (res.meta.status !== 200) {
                return this.$message.error('获取角色列表失败')
            }

            this.rolesList = res.data

        },
        async handleClose(rightid, role) {
            // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            const confirmResult = await
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('取消了删除')
            }
            const {
                data: res
            } = await this.$http.delete(`roles/${role.id}/rights/${rightid}`)
            if (res.meta.status !== 200) {
                this.$message.error('删除失败')
            }
            role.children = res.data
            this.$message.success('删除成功')
        },
        async showSetDialogVisible(role) {
            this.rolesId = role.id
            const {
                data: res
            } = await this.$http.get('rights/tree')
            if (res.meta.status !== 200) {
                return this.$message.erro('获取权限数据失败')
            }
            // 把获取到的权限数据保存到 data 中
            this.rightslist = res.data
            console.log(this.rightslist)
            this.getDefKeys(role, this.defkeys)
            this.setDialogVisible = true
        },
        // 获取三级权限id并保存到defkeys中
        getDefKeys(node, arr) {
            if (!node.children) {
                return arr.push(node.id)
            }
            node.children.forEach(item => 
                this.getDefKeys(item, arr)
            );
        },
        setDialogClose() {
            this.defkeys = []
        },
        async allotRights() {
            const keys = [
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys(),
            ]
            const idStr = keys.join(',')

            const {data: res} = await this.$http.post(`roles/${this.rolesId}/rights`, { rids:idStr})
            if(res.meta.status !== 200) {
                return this.$message.error('分配权限失败')
            }
            this.$message.success('分配权限失败')
            this.getRolesList()
            this.setDialogVisible = false
        }
    },
}
</script>

<style lang="less">
.el-tag {
    margin: 7px;
}

.bdtop {
    border-top: 1px solid #eee;
}

.bdbottom {
    border-bottom: 1px solid #eee;
}

.vcenter {
    display: flex;
    align-items: center;
}
</style>
