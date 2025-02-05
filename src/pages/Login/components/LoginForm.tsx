import { CheckCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { App, Button, Checkbox, Form, FormProps, Input, message } from 'antd'

import { sendCaptcha } from '@/api/login.ts'
import { generateUUID } from '@/utils/str.ts'

type FieldType = {
  username?: string
  password?: string
  captchaCode: string
  remember?: string
}
const LoginForm: React.FC = () => {
  // 保存图片验证码的状态
  const [imgUrl, setImgUrl] = useState('')
  const [captchaKey, setcaptchaKey] = useState(generateUUID())
  const loginAuth = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)

  const navigate = useNavigate()
  const { notification } = App.useApp()
  // 刷新验证码
  const refreshCaptcha = async () => {
    const { httpCode, status, data } = await sendCaptcha(captchaKey)
    if (httpCode === 200 && status === 'success') {
      setImgUrl(data.imageBase64)
    }
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await loginAuth({ ...values, captchaKey })
      navigate('/')
      notification.success({
        message: '登录成功',
        description: `欢迎你，尊敬的${user?.name ?? '管理员'}`,
        placement: 'topRight',
      })
    } catch (e: any) {
      message.error(e.message)
      setcaptchaKey(generateUUID())
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    refreshCaptcha()
  }, [captchaKey])

  useEffect(() => {
    logout()
  }, [])
  return (
    <Form
      name={'loginForm'}
      initialValues={{
        username: 'admin',
        password: 'admin123',
        remember: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType> name="username" rules={[{ required: true, message: '请输入您的用户名' }]}>
        <Input prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item<FieldType> name="password" rules={[{ required: true, message: '请输入您的密码' }]}>
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item<FieldType> name={'captchaCode'} rules={[{ required: true, message: '请输入验证码' }]}>
        {/*验证码*/}
        <Input
          prefix={<CheckCircleOutlined />}
          suffix={
            <img className={'cursor-pointer'} src={imgUrl} alt="" onClick={() => setcaptchaKey(generateUUID())} />
          }
        />
      </Form.Item>
      <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
        <Checkbox>记住我</Checkbox>
      </Form.Item>
      <Form.Item label={null}>
        <Button block type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
export default memo(LoginForm)
