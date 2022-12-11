<template>
    <div v-loading="loading">
        <el-form ref="ruleFormRef" :rules="rules" label-position="left" label-width="100px" :model="formValue"
            style="max-width: 460px">
            <el-form-item label="账号：" prop="uid">
                <el-input v-model="formValue.uid" />
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="formValue.email" />
            </el-form-item>
            <el-form-item label="昵称：" prop="nickname">
                <el-input v-model="formValue.nickname" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="formValue.password" />
            </el-form-item>
            <el-form-item label="确认密码：" prop="passwordConfirm">
                <el-input type="password" v-model="formValue.passwordConfirm" />
            </el-form-item>
        </el-form>
    </div>
    <el-button color="#626aef" @click="joinHandler">注册！</el-button>
</template>
  
<script lang="ts">
import { reactive, ref, defineComponent } from 'vue'
import { ElMessage, FormInstance } from 'element-plus';
import { join, JoinRequest } from "@/api/account";

export default defineComponent({
    methods: {
        joinHandler() {
            this.loading = true;
            if (!this.ruleFormRef) {
                ElMessage.closeAll();
                ElMessage.error("表单错误");
                this.loading = false;
                return;
            }
            this.ruleFormRef.validate((valid) => {
                if (!valid) {
                    ElMessage.closeAll();
                    ElMessage.error("请正确填写表单后再尝试注册");
                    this.loading = false;
                    return;
                }
                const joinRequeset: JoinRequest = {
                    uid: this.formValue.uid,
                    email: this.formValue.email,
                    'nick-name': this.formValue.nickname,
                    password: this.formValue.password,
                }
                join(joinRequeset).then(() => {
                    ElMessage.closeAll();
                    ElMessage.success("注册成功");
                    this.loading = false;
                    // this.$router.push('/profile');
                    location.reload();
                }).catch((err: Error) => {
                    ElMessage.closeAll();
                    ElMessage.error("注册失败 " + err.message);
                    this.loading=false;
                })
            })
        }
    },
    setup() {
        return {
            loading: ref(false),
            formValue: ref({
                uid: '',
                email: '',
                nickname: '',
                password: '',
                passwordConfirm: '',
            }),
            ruleFormRef: ref<FormInstance>(),
            isLogin: ref(false),
            rules: {
                uid: {
                    required: true,
                    message: '请输入你的帐号'
                },
                email: {
                    required: true,
                    message: '请输入你的邮箱'
                },
                nickname: {
                    required: true,
                    message: '请输入你的昵称'
                },
                password: {
                    required: true,
                    message: '请输入你的密码'
                },
                passwordConfirm: {
                    required: true,
                    message: '请确认你的密码'
                }
            }
        }
    },
    mounted() {
        this.isLogin=localStorage.getItem('login')==='true';
        if(this.isLogin){
            this.$router.push('/profile');
        }
    },
})
</script>
  