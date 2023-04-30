import { mailerClient } from "../clients/nodemailer";
import { confirmationEmailRequests, forgotEmailRequests, otpEmailRequests } from "../types/email.type"
import hbs from "nodemailer-express-handlebars";
import path from "path";
import express from "express";
import { MailOptions } from "nodemailer/lib/json-transport";

export interface IEmailsRepo {
    createConfirmationEmail(payload: confirmationEmailRequests): Promise<unknown>;
    createForgotEmail(payload: forgotEmailRequests): Promise<unknown>;
    fetch(get: unknown): Promise<Array<confirmationEmailRequests>>;
    createOTPEmail(payload: otpEmailRequests): Promise<unknown>;
}

export const EmailsRepo: IEmailsRepo = {
    async createConfirmationEmail(payload: confirmationEmailRequests): Promise<unknown> {
        try {
            const viewPath = path.resolve(__dirname, '../templates/views/');
            const partialsPath = path.resolve(__dirname, '../templates/partials');

            const { firstname,
                lastname,
                email,
                public_key,
                token } = payload;

            const transporter = mailerClient();

            transporter.use('compile', hbs({
                viewEngine: {
                    extName: '.handlebars',
                    // partialsDir: viewPath,
                    layoutsDir: viewPath,
                    // @ts-ignore
                    defaultLayout: false,
                    partialsDir: partialsPath,
                    express
                },
                viewPath: viewPath,
                extName: '.handlebars',
            }))

            const mailOptions: MailOptions = {
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Confirm your Ductape.io account',
                // @ts-ignore
                template: 'confirm',
                context: {firstname, lastname, token},
                /**attachments: [
                  { filename: 'abc.jpg', path: path.resolve(__dirname, './image/abc.jpg')}
                ]*/
            };

            const success = await transporter.sendMail(mailOptions);
            return success
        } catch (e) {
            if(process.env.NODE_ENV !== "production") console.log(e);
            throw e;
        }
    },
    async createForgotEmail(payload: forgotEmailRequests): Promise<unknown> {
        try {
            const viewPath = path.resolve(__dirname, '../templates/views/');
            const partialsPath = path.resolve(__dirname, '../templates/partials');

            const { firstname,
                lastname,
                email,
                public_key,
                token } = payload;

            const transporter = mailerClient();

            transporter.use('compile', hbs({
                viewEngine: {
                    extName: '.handlebars',
                    // partialsDir: viewPath,
                    layoutsDir: viewPath,
                    // @ts-ignore
                    defaultLayout: false,
                    partialsDir: partialsPath,
                    express
                },
                viewPath: viewPath,
                extName: '.handlebars',
            }))

            const mailOptions: MailOptions = {
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Ductape.io Password Reset',
                // @ts-ignore
                template: 'forgot',
                context: {firstname, lastname, token},
                /**attachments: [
                  { filename: 'abc.jpg', path: path.resolve(__dirname, './image/abc.jpg')}
                ]*/
            };

            // if(process.env.NODE_ENV !== "production") console.log(mailOptions);
            const success = await transporter.sendMail(mailOptions);
            // if(process.env.NODE_ENV !== "production") console.log(success);
            return success
        } catch (e) {
            if(process.env.NODE_ENV !== "production") console.log(e);
            throw e;
        }
    },
    async createOTPEmail(payload: otpEmailRequests): Promise<unknown> {
        try {
            const viewPath = path.resolve(__dirname, '../templates/views/');
            const partialsPath = path.resolve(__dirname, '../templates/partials');

            const { firstname,
                lastname,
                email,
                public_key,
                token } = payload;

            const transporter = mailerClient();

            transporter.use('compile', hbs({
                viewEngine: {
                    extName: '.handlebars',
                    // partialsDir: viewPath,
                    layoutsDir: viewPath,
                    // @ts-ignore
                    defaultLayout: false,
                    partialsDir: partialsPath,
                    express
                },
                viewPath: viewPath,
                extName: '.handlebars',
            }))

            const mailOptions: MailOptions = {
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Ductape.io Login OTP',
                // @ts-ignore
                template: 'otp',
                context: {firstname, lastname, token},
                /**attachments: [
                  { filename: 'abc.jpg', path: path.resolve(__dirname, './image/abc.jpg')}
                ]*/
            };

            const success = await transporter.sendMail(mailOptions);
            return success
        } catch (e) {
            if(process.env.NODE_ENV !== "production") console.log(e);
            throw e;
        }
    },
    async fetch(get: any): Promise<Array<confirmationEmailRequests>> {
        throw new Error("Function not implemented.");
    }
}