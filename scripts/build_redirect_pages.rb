
require 'csv'
require 'fileutils'

redirects = CSV.read("./scripts/redirects.csv")

redirects.each do |redirect|
  fileName = "./common/redirects/#{redirect[0]}.html"
  newFile = File.open(fileName, 'w')
  templateFile = File.new("./scripts/redirectTemplate.html")
  templateFile.each do |line|
    if line =~ /title:/
      line = "#{line} #{redirect[0]}"
    end
    if line =~ /permalink:/
      line = "#{line} #{redirect[1]}"
    end
    if line =~ /redirectURL:/
      line = "#{line} #{redirect[2]}"
    end
    if line =~ /id:/
      line = "#{line} #{redirect[3]}"
    end
    newFile.puts(line)
  end
  templateFile.close
  newFile.close
end