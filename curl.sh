#!/bin/sh

# Source: https://docs.blockscout.com/devs/verification/blockscout-smart-contract-verification-api

curl -Lv \
  --request POST \
  --url 'https://piccadilly.autonity.org/api/v2/smart-contracts/0xC66B0Ab3c084a57d0155B302186d84Ed7F47a6c8/verification/via/standard-input' \
  --header 'Content-Type: multipart/form-data' \
  --form 'compiler_version=v0.8.20+commit.a1b79de6' \
  --form 'contract_name=BUZToken' \
  --form 'files[0]=@BUZToken.json' \
  --form 'autodetect_constructor_args=false' \
  --form 'constructor_args=0000000000000000000000002f329433dbcf4918e5803776d866049d3f396d7e' \
  --form 'license_type=mit'
