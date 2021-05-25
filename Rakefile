# Not putting it into package.json/scripts since it's very ad-hoc.
REPO_PATH = File.join(ENV['HOME'], 'ios.scriptable')
BUILD_NAME = 'widget.bundle.js'
SCRIPTABLE_NAME = 'Today widget: update notes.js'

# To see the colours and icons, change them in the script settings
# and then see the preamble in Working Copy.
SCRIPTABLE_PREAMBLE = <<TEXT
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: greater-than;
TEXT

task :build do
  sh "yarn build"
end

desc "Copy over & push"
task :push do
  # FIXME: The gsub is a horrible hack.
  # script = [SCRIPTABLE_PREAMBLE, File.read(BUILD_NAME).gsub(/scriptable_ios_ts_1.Calendar/, 'Calendar').gsub(/^main\(\);$/, 'await main();')].join("\n\n")
  script = [SCRIPTABLE_PREAMBLE, File.read(BUILD_NAME).gsub(/scriptable_ios_ts_1.(Calendar|CallbackURL)/, '\1')].join("\n\n")

  Dir.chdir(REPO_PATH) do
    sh "git pull -r"
    File.open(SCRIPTABLE_NAME, 'w') do |file|
      file.puts(script)
    end
    sh "git add '#{SCRIPTABLE_NAME}'"
    sh "git commit '#{SCRIPTABLE_NAME}' -m 'Automatic commit from #{Time.now.strftime('%H:%M')}'"
    sh "git push origin master"
  end
end

desc "Build & push"
task default: [:build, :push]
