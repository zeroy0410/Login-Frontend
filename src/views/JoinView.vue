<template>
    <div v-loading="loading">
        <el-form ref="ruleFormRef" :rules="rules" label-position="left" label-width="130px" :model="formValue"
            style="max-width: 460px">
            <el-form-item label="账号：" prop="uid">
                <el-input v-model="formValue.uid" />
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-input v-model="formValue.email" />
                    </el-col>
                    <el-col :span="8">
                        <el-button :loading="checkCodeBtn.loading" color="#626aef"
                            :disabled="checkCodeBtn.disabled"
                            @click="verifyEmailHandler">{{checkCodeBtn.text}}</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="邮箱验证码：" prop="verifyemail">
                <el-input v-model="formValue.verifyemail" />
            </el-form-item>
            <el-form-item label="昵称：" prop="nickname">
                <el-input v-model="formValue.nickname" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="formValue.password" />
            </el-form-item>
            <el-form-item label="">
                <vue-recaptcha @verify="captchaVerifyHandler($event)" />
            </el-form-item>
        </el-form>
    </div>
    <el-button color="#626aef" @click="joinHandler">注册！</el-button>
</template>
  
<script lang="ts">
import { reactive, ref, defineComponent } from 'vue'
import { ElMessage, FormInstance } from 'element-plus';
import { join, VerifyEmail, JoinRequest, EmailRequest } from "../api/account";
import { VueRecaptcha } from "vue3-recaptcha-v2";
import { useRefHistory } from '@vueuse/core';
import { analyze } from 'eslint-scope';


export default defineComponent({
    components: { VueRecaptcha },
    methods: {
        captchaVerifyHandler(response: string) {
            this.captchaVerified = true,
                this.captchaToken = response
        },
        verifyEmailHandler() {
            // this.loading = true;
            this.checkCodeBtn.loading=true,
            this.checkCodeBtn.disabled=true,
            this.checkCodeBtn.timer && clearInterval(this.checkCodeBtn.timer)
            this.checkCodeBtn.timer = setInterval(() => {
                const tmp = this.checkCodeBtn.duration--
                this.checkCodeBtn.text = `${tmp}秒`
                if (tmp <= 0) {
                    clearInterval(this.checkCodeBtn.timer)
                    this.checkCodeBtn.duration = 60
                    this.checkCodeBtn.text = '重新获取'
                    this.checkCodeBtn.disabled = false
                    this.checkCodeBtn.loading = false
                }
            }, 1000)
            const emailRequest: EmailRequest = {
                'verify-email': this.formValue.email,
                // 'captcha-token': this.captchaToken
            }
            VerifyEmail(emailRequest).then(() => {
                ElMessage.closeAll();
                ElMessage.success("验证码已发送");
                // this.loading = false;
                // this.$router.push('/profile');
                // location.reload();
            }).catch((err: Error) => {
                ElMessage.closeAll();
                ElMessage.error("验证码发送失败 " + err.message);
                // this.loading = false;
            })
        },
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
                    'verify-email': this.formValue.verifyemail,
                    'nick-name': this.formValue.nickname,
                    password: this.formValue.password,
                    'captcha-token': this.captchaToken
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
                    this.loading = false;
                })
            })
        }
    },
    setup() {
        return {
            checkCodeBtn: ref({
                loading: false,
                disabled: false,
                text: '发送验证码',
                duration: 60,
                timer: ref(),
            }),
            captchaVerified: ref(false),
            captchaToken: ref(''),
            loading: ref(false),
            formValue: ref({
                uid: '',
                email: '',
                verifyemail: '',
                nickname: '',
                password: '',
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
                verifyemail: {
                    required: true,
                    message: '请输入邮箱验证码'
                }
            }
        }
    },
    mounted() {
        this.isLogin = localStorage.getItem('login') === 'true';
        if (this.isLogin) {
            this.$router.push('/profile');
        }
    },
})
</script>
  