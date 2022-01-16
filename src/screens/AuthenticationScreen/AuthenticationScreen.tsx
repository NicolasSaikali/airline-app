import React, { useEffect, useState } from 'react'
import { Button, InputList, Loader, TextInput } from '../../components'
import { HttpService, StorageService } from '../../services'
import "./styles.css"
export const AuthenticationScreen = (props: any) => {
    const [signupLoading, setSignupLoading] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)
    const [signupErrorPrompt, setSignupErrorPrompt] = useState<string | null>(null)
    const [loginErrorPrompt, setLoginErrorPrompt] = useState<string | null>(null)
    const [redirect, setRedirect] = useState('')
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const [signupData, setSignupData] = useState<{
        email: string,
        password: string,
        countryOfResidence: string
    }>({
        email: '',
        password: '',
        countryOfResidence: ''
    })

    const updateSignupData = (key: string, value?: string) => {
        setSignupData({ ...signupData, [key]: value })
    }
    const updateLoginData = (key: string, value?: string) => {
        setLoginData({ ...loginData, [key]: value })
    }
    const handleLogin = async () => {
        setLoginLoading(true)
        setLoginErrorPrompt(null)
        const response = await HttpService({
            url: '/user/login',
            method: 'post',
            data: loginData,
        })
        setLoginLoading(false)
        if (response.data === '')
            setLoginErrorPrompt('Wrong credentials')
        else {
            StorageService.setAuthenticationCredentials({
                id: response?.data?.id,
                email: response?.data?.email,
                apiKey: response?.data?.apiKey
            })
            window.location.href = redirect ? redirect : '/'
        }
    }
    const handleSignup = async () => {
        setSignupLoading(true)
        setSignupErrorPrompt(null)
        if (signupData.email === '' ||
            signupData.password === '' ||
            signupData.countryOfResidence === '') {
            setSignupErrorPrompt('Please fill all the fields below')
            return
        }
        if (!signupData.email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
            setSignupErrorPrompt('Please enter a valid email address')
        }
        const response = await HttpService({
            url: '/user/create',
            method: 'post',
            data: signupData
        })
        setSignupLoading(false)
        if (response.status === 409) {
            setSignupErrorPrompt('Email already in use')
        }
        else if (response.status === 200) {
            StorageService.setAuthenticationCredentials({
                id: response?.data?.id,
                email: response?.data?.email,
                apiKey: response?.data?.apiKey
            })
            window.location.href = redirect ? redirect : '/'
        }
    }

    useEffect(()=>{
        const redirectTo = window.location.href.split('?redirect=')[1]
        setRedirect(redirectTo)
    },[])

    return <>
        {(loginLoading || signupLoading) ? <div className="overlay-loader d-flex justify-content-center align-items-center">
            <Loader />
        </div> : null}
        <img src={`${process.env.PUBLIC_URL}/assets/world.svg`} alt="" className="world-img w-100" />
        <div className="container">
            <div className="row justify-content-center">
                <div className="py-5 col-lg-7 text-center">
                    <h3 className='font-primary text-bold w-100'>
                        LOGIN
                    </h3>
                    <i className="text-danger">
                        {loginErrorPrompt ? loginErrorPrompt : ''}
                    </i>
                    <div className="row justify-content-center pt-5">
                        <div className="col-md-8">
                            <TextInput
                                placeholder='Email address'
                                onBlur={(text: string) => updateLoginData('email', text)}
                            />
                        </div>
                        <div className="col-md-8 pt-3">
                            <TextInput
                                placeholder='Password'
                                onBlur={(text: string) => updateLoginData('password', text)}
                            />
                        </div>
                        <div className="col-md-8 pt-5 mt-2">
                            <Button
                                type={'outline'}
                                content='Login'
                                onPress={handleLogin}
                            />
                        </div>
                    </div>
                </div>
                <div className="py-5 col-lg-7 text-center">
                    <h3 className='font-primary text-bold w-100'>
                        SIGNUP
                    </h3>
                    <i className="text-danger">
                        {signupErrorPrompt ? signupErrorPrompt : ''}
                    </i>
                    <div className="row justify-content-center pt-5">
                        <div className="col-md-8">
                            <TextInput
                                type="email"
                                placeholder='Email address'
                                onBlur={(text: string) => updateSignupData('email', text)}
                            />
                        </div>
                        <div className="col-md-8 pt-3">
                            <TextInput
                                onBlur={(text: string) => updateSignupData('password', text)}
                                placeholder='Password' />
                        </div>
                        <div className="col-md-8 pt-3">
                            <InputList
                                id="CountryOfResidence"
                                data={[{
                                    label: "Lebanon",
                                    value: "Lebanon",
                                },
                                {
                                    label: "France",
                                    value: "France",
                                }, {
                                    label: "Germany",
                                    value: "Germany",
                                }, {
                                    label: "Italy",
                                    value: "Italy",
                                },
                                {
                                    label: "UAE",
                                    value: "UAE",
                                }]}
                                placeholder={'Country of residence'}
                                onChange={(newValue) => updateSignupData('countryOfResidence', newValue?.value)}
                            />
                        </div>
                        <div className="col-md-8 pt-5 mt-2">
                            <Button
                                type={'filled'}
                                content='Signup'
                                onPress={handleSignup}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}