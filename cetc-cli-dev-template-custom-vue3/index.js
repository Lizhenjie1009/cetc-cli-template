function install (options) {
  try {
    // 缓存目录
    // const templatePath = path.resolve(this.templateNpm.cacheFilePath, 'template')
    const sourcePath
    // 当前目录
    const targetPath = process.cwd()
    fse.ensureDirSync(templatePath) // 确保目录为真
    fse.ensureDirSync(targetPath) // 确保目录为真
    fse.copySync(templatePath, targetPath) 
  } catch (e) {
    throw e;
  } finally {
    log.success('安装模板成功')
  }

  const templateIgnore = this.templateInfo.ignore || []
  const ignore = ['**/node_modules/**', ...templateIgnore]
  await this.ejsRender({ ignore })

  const { installCommand, startCommand } = this.templateInfo
  // 依赖安装
  await this.execCommand(installCommand, '依赖安装失败！')
  // 启动命令执行
  await this.execCommand(startCommand, '启动执行命令失败！')
}

module.exports = install