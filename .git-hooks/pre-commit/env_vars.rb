#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'

# Prevent a Ruby stack trace from appearing when we interrupt the hook.
Signal.trap('INT') do
  puts 'Hook run interrupted'
  exit 130
end

puts "======================================================="
puts "Running Verification for tokens, secret keys, etc..."
puts "======================================================="
puts ""

# Declare Postman var Files that need to be audited and include the the key fields
# that need to be verified to be blank
ENV_FILES = {
  'postman/Data_at_the_Point_of_Care_Sandbox.postman_environment.json' => [
    'macaroon',
    'PRIVATE_KEY',
    'key_id',
    'jwt_token',
    'access_token',
    'job-id',
    'file_name',
    'patient_npi'
  ],
  'postman/DPC_API.postman_globals.json' => [
    'organization_id',
    'attribution_group'
  ]
}.freeze

# Only need to check the files if they have been committed with changes
FILES_MODIFIED = `git diff --cached --name-only`.chomp.split("\n")

errors = []

FILES_MODIFIED.each do |file|
  if ENV_FILES.key?(file)
    file_data = JSON.parse(File.read(file))
    file_data['values'].each do |v|
      if ENV_FILES[file].include?(v['key']) && !v['value'].empty?
        errors.append("Key var `#{v['key']}` must have a blank value.")
      end
    end
  end
end

# Print any and all errors found
unless errors.empty?
  puts "The following commit errors have been found..."
  errors.each do |error|
    puts "*****"
    puts error
  end

  exit 1
end
