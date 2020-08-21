export class Confstructor {
    schema;
    configuration;

    config = {};

    /**
     * Confstructor constructor
     * (haha funny)
     *
     * @param {*} schema
     * @param {*} validate
     */
    constructor(schema, validate) {= {};
    }

    /**
     * Begin the validation.
     */
    validate() {
        let config = {};

        if (!this.schema) {
            throw new Error('Internal Issue: Missing configuration schema')
        }

        if (!this.configuration) {
            throw new Error('Config validation: You haven\'t provided any configuration.')
        }

        this.config = config;

        return this;
    }

    /**
     * Processing configuration key.
     *
     * @internal This is internal code. Do not use it unless you know what you're doing.
     *
     * @param {string} key
     * @param {object} settings
     * @param {object} config
     * @param {object} userConfig
     */
    processKey(key, settings, config, userConfig) {
        if (!userConfig.hasOwnProperty(key)) {
            if (settings.required) {
                if (settings.hasOwnProperty("default")) {
                    console.warn(
                        `Required config property ${key} is missing in the config, falling back to default values.`
                    );
                    config[key] = settings.default;
                } else {
                    throw new Error(
                        `Required config property ${key} is missing, exiting.`
                    );
                }
            }
        } else {
            config[key] = userConfig[key];
        }
        if (settings.hasOwnProperty("children")) {
            for (let cKey in settings["children"]) {
                let cSettings = settings["children"][cKey];
                this.processKey(cKey, cSettings, config[key], userConfig[key]);
            }
        }
    }

    /**
     * Returns the resulting configuration
     */
    return() {
        return this.config;
    }
}

export default Confstructor;
