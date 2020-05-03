let PartUserProfile = require("partUserProfile/lib/main");

let partLoggerConfig = {
    global: {
        //partMongoInterfaceConfig: partMongoInterfaceConfig,
        //partDataLayerInterfaceConfig: partDataLayerInterfaceConfig
    },
    instance: {
        sourceTypeWidth: 8,
        sourceNameWidth: 20,
        winstonConfig: {
            handleExceptions: true,
            json: true,
            colorize: true,
            timestamp: function () {
                return (new Date()).toLocaleTimeString();
            },
            prettyPrint: true
        },
        storageConfig: {
            dls: {
                enabled: false,
                storageName: 'Logger@6-test'
            },
            mongo: {
                enabled: false,
                storageName: 'Logger@6-test'
            },
            fileSystem: {
                enabled: false,
                path: 'message.json'
            },
            http: {
                enabled: false,
                host: '127.0.0.1',
                port: '80',
                path: '/service/logServer/saveLog',
                method: 'POST'
            }
        },
        levelConfig: {
            event: {
                view: true,
                save: true,
                color: 'green',
                viewPath: false,
                priority: 2
            },
            warning: {
                view: true,
                save: true,
                color: 'yellowBg',
                viewPath: true,
                priority: 1
            },
            error: {
                view: true,
                save: false,
                color: 'redBg',
                viewPath: true,
                priority: 0
            },
            info: {
                view: true,
                save: true,
                color: 'blueBg',
                viewPath: true,
                priority: 3
            },
            saves: {
                view: true,
                save: true,
                color: 'cyanBg',
                viewPath: true,
                priority: 4
            },
            mosifa: {
                view: true,
                save: false,
                color: 'cyanBg',
                viewPath: true,
                priority: 5
            },
            part: {
                view: true,
                save: true,
                color: 'cyanBg',
                viewPath: true,
                priority: 6
            }
        }
    }
};
let partRedisInterfaceConfig = {
    global: {
        partLoggerConfig: partLoggerConfig
    },
    instance: {
        host: '127.0.0.1',
        port: 6379,
        db: 5,
        // clientOptions: {
        //   password: 'sardgh'
        // },
        log: {
            view: true,
            save: true
        }
    }
};
let tracerConfig = {
    TraceTitle: 'partSamadInterface@' + "12.0.1",
    sampler: {
        type: 'probabilistic',
        param: 1
    },
    templates: {
        tagTemplate: {component: 'partSamadInterface@' + "12.0.1"},
        logTemplate: {component: 'partSamadInterface@' + "12.0.1"}
    }
};
let partSamadInterfaceConfig = {
    global: {
        gatewayEnable: false,
        host: 'publicservices.partdp.ir', // دامنه‌ی سرویس از طریق گیت‌وی
        protocol: 'http',
        port: 80,
        tracerConfig: tracerConfig,
        partLoggerConfig: partLoggerConfig,
        partRedisInterfaceConfig: partRedisInterfaceConfig
    },
    instance: {
        cacheTtl: 60 * 60 * 1000,// مدت زمان نگهداری cache
        auth: { // نام کاربری و پسورد برای دریافت توکن از گیت‌وی
            user: 'intern_6',
            pass: 'intern_6'
        }
    }
};
let AuthenticationConfig = {
    global: {
        gatewayEnable: true,
        host: 'publicservices.apipart.ir',
        protocol: 'http',
        port: 80,
        tracerConfig: tracerConfig,
        partLoggerConfig: partLoggerConfig,
    },
    instance: {
        auth: {
            user: 'intern_6',
            pass: 'intern_6'
        }
    }
};
let partProfileConfig = {
    global: {
        gatewayEnable: false,
        host: 'publicservices.partdp.ir', // دامنه‌ی سرویس
        protocol: 'http',
        port: 80,
        partLoggerConfig: partLoggerConfig,
        tracerConfig: tracerConfig
    },
    instance: {
        auth: {
            user: 'intern_6',
            pass: '123456' // اختیاری است و بستگی به این دارد که سرویس مقصد پسورد بخواهد یا نه
        }
    }
};
let partUserProfileConfig = {
    global: {
        partSamadInterfaceConfig: partSamadInterfaceConfig,
        partAuthenticationInterfaceConfig: AuthenticationConfig,
        partProfileInterfaceConfig: partProfileConfig,
    },
    instance: {}
};
let UserProfile = new PartUserProfile(partUserProfileConfig.global);
let userProfile = new UserProfile(partUserProfileConfig.instance);

exports.httpHandlers = userProfile.getHttpHandlers();
