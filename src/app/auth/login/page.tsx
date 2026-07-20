"use client"
import { FormikInput } from "@/components/CommanFields/FormikInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthHandlers } from "@/components/handlers/auth.handlers";
import { authIntialvalues, loginValidation } from "@/formik/validations/auth.validation";
import { Form, Formik } from "formik";

export default function LoginPage() {
    const { handleLogin, isLoading } = useAuthHandlers()
    return (
        <Formik
            initialValues={authIntialvalues}
            validationSchema={loginValidation}
            enableReinitialize
            onSubmit={(values) => {
                handleLogin(values);
            }}
        >
            {({ dirty, isSubmitting }) => {
                return (
                    <Form className="space-y-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="signin-email">Email</Label>
                            <FormikInput
                                id="signin-email"
                                name="email"
                                type="email"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="signin-password">Password</Label>
                            <FormikInput
                                id="signin-password"
                                name="password"
                                type="password"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={!dirty || isLoading}>
                            {isLoading ? "Signing in…" : "Sign in"}
                        </Button>
                    </Form>
                )
            }}
        </Formik >
    );
}