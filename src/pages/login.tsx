import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { setToken } from '@/lib/auth';
import service from '@/lib/http';

const Login = (props: { codeImg: string; logId: string }) => {
  const { codeImg, logId } = props;
  const router = useRouter();
  const defaultValues = {
    username: '',
    password: '',
    code: '',
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (data: LOGIN_FORM) => {
    const res = await service.post('/api/v1/login', {
      uuid: logId,
      ...data,
    });

    if (res.data.code === 200) {
      setToken(res.data.token);
      reset();
      router.push('/');
    }
    reset();
  };

  const getFormErrorMessage = (name: keyof LOGIN_FORM) => {
    return (
      errors[name] && <small className='p-error'>{errors[name]?.message}</small>
    );
  };

  return (
    <div
      className='flex h-screen w-screen items-center justify-center'
      style={{ backgroundColor: 'var(--primary-color)' }}
    >
      <div className='form-demo'>
        <div className='justify-content-center flex'>
          <div
            className='card'
            style={{ backgroundColor: 'var(--surface-card)' }}
          >
            <h5 className='text-center text-3xl'>登陆</h5>
            <form onSubmit={handleSubmit(onSubmit)} className='p-fluid'>
              <div className='field'>
                <span className='p-float-label'>
                  <Controller
                    name='username'
                    control={control}
                    rules={{ required: '请输入用户名' }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={
                          fieldState.invalid ? 'p-invalid  my-2' : ' my-2'
                        }
                      />
                    )}
                  />
                  <label
                    htmlFor='用户名'
                    className={errors.username ? 'p-error mb-2' : ''}
                  >
                    用户名 *
                  </label>
                </span>
                {getFormErrorMessage('username')}
              </div>
              <div className='field my-4'>
                <span className='p-float-label'>
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: '密码是必需的.' }}
                    render={({ field, fieldState }) => (
                      <Password
                        id={field.name}
                        {...field}
                        feedback={false}
                        className={
                          fieldState.invalid ? 'p-invalid  my-2' : ' my-2'
                        }
                      />
                    )}
                  />
                  <label
                    htmlFor='password'
                    className={errors.password ? 'p-error mb-2' : ''}
                  >
                    密码 *
                  </label>
                </span>
                {getFormErrorMessage('password')}
              </div>
              <div className='field my-4'>
                <span className='p-float-label'>
                  <Controller
                    name='code'
                    control={control}
                    rules={{ required: '请输入验证码' }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={
                          fieldState.invalid ? 'p-invalid  my-2' : ' my-2'
                        }
                      />
                    )}
                  />
                  <label
                    htmlFor='验证码'
                    className={errors.password ? 'p-error mb-2' : ''}
                  >
                    验证码 *
                  </label>
                </span>
                {getFormErrorMessage('password')}
              </div>
              <img src={codeImg} alt='' className='my-2' />
              <Button type='submit' label='登陆' className='my-2' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await service.get('/api/v1/captcha');

  return {
    props: { codeImg: data.data, logId: data.id }, // will be passed to the page component as props
  };
}

export default Login;
