#!/bin/sh
#
# Script executed at docker image startup.
# Fills in the API URL from the environment variable.

# Check that the variable exists and is in the correct format
if [ -z "$API_URL" ]; then
    echo >&2 "ERROR: The API_URL environment variable is not set!"
    exit 1
elif ! echo "$API_URL" | grep -q -E '^https?://'; then
    echo >&2 "ERROR: API_URL must be an absolute URL! Given: '$API_URL'"
    exit 2
else
    echo "Running with API URL: '$API_URL'"
fi

# Replace all usages of the placeholder value with the environment variable
find /usr/share/nginx/html -follow -type f \( -name '*.js' -o -name '*.html' -o -name '*.css' \) \
    -exec sed -i "s#__API_URL_PLACEHOLDER__#${API_URL}#g" '{}' \;
