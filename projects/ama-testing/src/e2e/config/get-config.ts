 /*!
 * @license
 * Copyright 2019 Alfresco, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TestConfig } from './test.config.interface';

require('dotenv').config({ path: process.env.ENV_FILE });

const env = process.env;
const path = require('path');

const E2E_HOST = process.env.E2E_HOST || 'localhost',
    E2E_PORT = process.env.E2E_PORT;

export function getConfig(rootPath: string = __dirname): TestConfig {
    const outputDir = path.join(rootPath, '/../e2e-output');
    return {
        main: {
            default_timeout: parseInt(env.DEFAULT_TIMEOUT, 10) || 20000,
            presence_timeout: parseInt(env.PRESENCE_TIMEOUT, 10) || 60000,
            rootPath: rootPath,
            browserWidth: 1600,
            browserHeight: 1000,
            paths: {
                tmp: path.join(outputDir, '/tmp'),
                screenShots: path.join(outputDir, '/screenshots'),
                junitReport: path.join(outputDir, '/junit-report'),
                reports: path.join(outputDir, '/reports/'),
                download: path.join(outputDir, '/downloads')
            },
            screenshots: {
                url: process.env.SCREENSHOT_URL,
                user: process.env.SCREENSHOT_USERNAME,
                password: process.env.SCREENSHOT_PASSWORD,
            }
        },
        ama: {
            url: `${E2E_HOST}${E2E_PORT ? `:${E2E_PORT}` : ''  }`,
            backendConfig: {
                authType: 'OAUTH',
                oauth2: {
                    host: process.env.OAUTH_HOST,
                    clientId: process.env.OAUTH_CLIENDID || 'alfresco',
                    scope: 'openid',
                    secret: '',
                    implicitFlow: true,
                    silentLogin: true,
                    redirectUri: '/',
                    redirectUriLogout: '/logout'
                },
                bpmHost: process.env.API_HOST
            },
            user: env.E2E_USERNAME,
            password: env.E2E_PASSWORD,
            unauthorized_user: env.E2E_UNAUTHORIZED_USER,
            unauthorized_user_password: env.E2E_UNAUTHORIZED_USER_PASSWORD,
            appTitle: 'AMA'
        }
    };
}
