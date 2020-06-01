<template>
<el-container>
    <el-header>
        <div>
            <img src="../assets/heima.png" alt="">
            <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
            <div class="toggle-button" @click="toggleCollapse">|||</div>
            <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" :collapse='isCollapse' unique-opened :collapse-transition='false' :router='true' :default-active='activePath'>
                <el-submenu :index="menu.id + ''" v-for="menu in menulist" :key="menu.id">
                    <template slot="title">
                        <i :class="iconObject[menu.id]"></i>
                        <span>{{menu.authName}}</span>
                    </template>
                    <el-menu-item :index="'/' + two_menu.path" v-for="two_menu in menu.children" :key="two_menu.id" @click="saveNav('/' + two_menu.path)">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{two_menu.authName}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            menulist: [],
            iconObject: {
                '125': 'iconfont icon-user',
                '103': 'iconfont icon-tijikongjian',
                '101': 'iconfont icon-shangpin',
                '102': 'iconfont icon-danju',
                '145': 'iconfont icon-baobiao'
            },
            isCollapse: false,
            activePath: ''
        }
    },
    created() {
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('active')
        console.log(this.activePath)
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push('/login')
        },
        async getMenuList() {
            const {
                data: res
            } = await this.$http.get('menus')
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.menulist = res.data
            console.log(res)
        },
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        saveNav(activePath) {
            this.activePath = activePath
            window.sessionStorage.setItem('active', activePath);

        }
    },
}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    color: #ffffff;
    font-size: 20px;

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 15px;
        }
    }
}

.el-aside {
    background-color: #333744;

    .el-menu {
        border-right: none;
    }
}

.el-main {
    background-color: #EAEDF1;
}

.el-container {
    height: 100%;
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    text-align: center;
    line-height: 24px;
    color: #ffffff;
    letter-spacing: 0.2em;
}
</style>
