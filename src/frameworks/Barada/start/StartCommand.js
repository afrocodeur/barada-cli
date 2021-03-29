const ProjectService = require("../../../services/ProjectService");
const ProjectSelectPrompt = require("./ProjectSelectPrompt");

const Command = require('../../../commands/Command');
const Console = require('../../../commands/Console');

const File = require('../../../utils/File');

class StartCommand extends Command{
    static SIGNATURE = 'start {--project=?}';
    static DESCRIPTION = 'Start new project from online existing projects';

    async handler() {
        let load = this.load('');
        try {
            let projects = await ProjectService.all();
            load.stop();
            if(projects) {
                let project = this.preselected(projects, this.option('project')), data = null;
                if(!project) {
                    let questions = await (new ProjectSelectPrompt(projects)).prompt();
                    if(questions.check()) {
                        data = questions.all();
                    }
                }
                else {
                    data = {project, resources: project.resources, folder: project.name.toLowerCase()};
                }

                if(data && data.folder && data.resources) {
                    let creation = await this.create(data);
                }
                else {
                    if(data.project) {
                        Console.error('[Error] please make sure you done well your project configuration.');
                    }
                }
            }
        }catch (e) {
            load.stop();
        }
    }

    preselected(projects, project) {
        for(let item of projects) {
            if(item.name === project || item.id === parseInt(project)) {
                return item;
            }
        }
        return null;
    }

    async create(data) {
        // TODO : Installation of frameworks
        try {
            let create = true, answer = null;
            if(File.exists(data.folder)) {
                create = false;
                Console.error('fatal: destination path [' + data.folder + '] already exists and is not an empty directory.');
                answer = await this.confirm('Do you want to remove the existing folder ?');
                if(answer.check()) {
                    File.rmDir(data.folder);
                    create = true;
                }
            }
            if(create) {
                File.mkpath(data.folder);
                File.write(data.folder + '/barada.json', {cli: 'barada'});
                await this.install(data.resources, data);
            }

        }catch (e) {
            Console.error(e.message);
        }
    }

    async install(resources, data) {
        if(resources.length) {
            let resource = resources.shift();
            let detector = this.detector(resource.name);
            if(detector) {
                let framework = detector.framework(this);
                try{
                    await framework.install(resource, data);
                    await framework.init(resource, data);
                }catch (e) {
                    Console.error(e.message);
                }
            }
            else {
                Console.warning('[Manager] no manger find for ' + resource.name);
            }
            await this.install(resources, data);
        }
        return true;
    }

}

module.exports = StartCommand;
