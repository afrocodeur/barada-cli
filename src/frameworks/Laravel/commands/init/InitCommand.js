const Command = require('../../../../commands/Command');
const Console = require('../../../../commands/Console');
const File = require('../../../../utils/File');
const ProjectService = require('../../../../services/ProjectService');
const LaravelFramework = require('../../LaravelFramework');
const ProjectPrompt = require('./ProjectPrompt');

class InitCommand extends Command{
    static SIGNATURE = 'init {--project=0}';
    static DESCRIPTION = 'Reinitialize an existing repository';

    Framework = LaravelFramework;

    async handler() {
        let projects = await ProjectService.all(this);
        let selector = new ProjectPrompt(projects);

        let project = this.option('project'), resource = null;
        if(project) {
            project = ProjectService.find(projects, project);
            resource = ProjectService.findResource(project, LaravelFramework.Framework);
        }
        else {
            let answer = await selector.prompt();
            resource = answer.laravel();
            if(!resource) {
                Console.error('Laravel configuration is not found in this project settings');
                return this;
            }
            project = answer.project();
        }

        if(resource) {
            let framework = this.framework();
            await framework.init(resource, {project: project, path: this.location});
        }
        else {
            Console.error('Project not found');
        }

        return super.handler();
    }
}

module.exports = InitCommand;
