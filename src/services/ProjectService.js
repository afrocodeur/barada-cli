const DefaultService = require("./DefaultService");
const AuthService = require("./AuthService");
const Console = require("../commands/Console");
const LoginCommand = require("../frameworks/Barada/login/LoginCommand") ;


class ProjectService extends DefaultService {

    static async all(command) {
        try {
            if(!AuthService.check()) {
                await (new LoginCommand()).handler();
            }
            if(AuthService.check()) {
                let load = command ? command.load('') : null;
                let {data: projects} = await DefaultService.Axios.post('projects');
                load ? load.stop() : null;
                if(projects && projects.length) {
                    for (let project of projects) {
                        project.resources.forEach(resource => {
                            resource.params = resource.params || JSON.parse(resource.pivot.params) || {};
                            resource.env = resource.params.env || {};
                        });
                    }
                    return projects;
                }
                else  {
                    Console.warning('[INFO] please create and configure project before')
                }
            }

            return null;
        }
        catch (e) {
            console.log(e.message);
            return null;
        }
    }

    static findResource(project, resource = null) {
        for(let item of project.resources) {
            if(item.name.toLowerCase() === resource) {
                return item;
            }
        }
        return null;
    }
    static find(projects, project, resource = null) {
        for(let item of projects) {
            if(item.id === parseInt(project) || item.name.toLowerCase() === project) {
                return resource ? ProjectService.findResource(project, resource) : item;
            }
        }
        return null;
    }

}

module.exports = ProjectService;
