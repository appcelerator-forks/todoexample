#!/usr/bin/env bash
appc ti clean
appc ti build --platform ios --distribution-name 'Step Up Software Ltd (5G7A26HKSW)' --pp-uuid 'ff1a0500-88f8-4715-8144-57bf5fc8c8f9' --target dist-adhoc --output-dir ./dist/
