let selectable = ['framework'];

function resources(project){
    let resources = {};

    for (let item of project.resources) {
        if(selectable.indexOf(item.type) >= 0)
            resources[item.id] = {
                name : item.name,
                value : item
            }
    }

    return Object.values(resources);
}


module.exports = function(projects, create = false){

    let lists = {
        projects : []
    };

    for(const item of projects){
        lists.projects.push({
            name : item.name,
            value : item
        });
    }

    return [
        {
            name : 'project',
            message : 'Select your project',
            type : 'list',
            choices : lists.projects
        },
        {
            name : 'resources',
            message : 'Select the resources of the project',
            type : 'checkbox',
            when : (answers) => (answers.project && answers.project.id > 0 && answers.project.resources.length),
            choices : function(answers){
                return resources(answers.project)
            }
        },
        {
            name : 'folder',
            type : 'input',
            message : 'The name of folder',
            default : (answers) => (answers.project.name.toLowerCase()),
            when : (answers) => (create && answers.project && answers.project.id > 0 && answers.project.resources.length),
        }
    ]
};
