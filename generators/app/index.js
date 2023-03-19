
const Generator = require('yeoman-generator');
const fs = require('fs')

module.exports = class extends Generator { 
    // 用户输入提示
    prompting () { 
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your Project Name',
            default: this.appname
        }]).then(answer => { 
            this.answer = answer
        })
    }
    writing () { 
        fs.readdir(this.sourceRoot(), (err, files) => { 
            if (err) { 
                console.log(err,'err')
                return
            } 
            for (let item of files) { 
                console.log(item,'item')
                if (item) { 
                    const templ = this.templatePath(item)
                    const output = this.destinationPath(item)
                    const content =this.answer
                    this.fs.copyTpl(templ,output,content)
                }
            }
        })
    }
}