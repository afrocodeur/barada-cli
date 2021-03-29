const ConsolePrompt = require('../../../abstracts/ConsolePrompt');

class ProjectSelectPrompt extends ConsolePrompt{
    projects = [];
    constructor(projects) {
        super();
        this.projects = projects;
    }

    list() {
        let questions = [];
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

    resources(project) {
        let resources = [];
        for(let item of project.resources) {
            if(item.type === 'framework') {
                resources.push({
                    name : item.name,
                    value : item
                });
            }
        }
        return resources;
    }

    questions() {
        return [
            {
                name : 'project',
                message : 'Select your project',
                type : 'list',
                choices : this.list()
            },
            {
                name : 'resources',
                message : 'Select the resources of the project',
                type : 'checkbox',
                when : (answers) => (answers.project && answers.project.id > 0 && answers.project.resources.length),
                choices : (answers) => (this.resources(answers.project))
            },
            {
                name : 'folder',
                type : 'input',
                message : 'The name of folder',
                default : (answers) => (answers.project.name.toLowerCase()),
                when : (answers) => (answers.resources),
            }
        ];
    }

    check() {
        return super.check();
    }

}

module.exports = ProjectSelectPrompt;
