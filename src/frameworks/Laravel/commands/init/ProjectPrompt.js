const ConsolePrompt = require('../../../../abstracts/ConsolePrompt');
const LaravelFramework = require('../../LaravelFramework');

class ProjectPrompt extends ConsolePrompt{
    projects = [];

    constructor(projects) {
        super();
        this.projects = projects;
    }
    list() {
        let questions = [], addable = false;
        for(let project of this.projects) {
            if(project.resources) {
                questions.push({
                    name : project.name,
                    value : project
                });
            }
        }
        return questions;
    }

    project() {
        return this.get('project');
    }
    laravel() {
        let project = this.get('project');
        if(project) {
            for(let resource of project.resources) {
                if(resource.name.toLowerCase() === LaravelFramework.Framework) {
                    return resource;
                }
            }
        }

        return false;
    }

    questions() {
        return [
            {
                name : 'project',
                message : 'Select your project',
                type : 'list',
                choices : this.list()
            }
        ]
    }
}

module.exports = ProjectPrompt;
