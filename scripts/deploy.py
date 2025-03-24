from brownie import accounts, BUZToken
import os

def main(owner):
    deployer = accounts.add(os.getenv("DEPLOYER_PRIVATE_KEY"))
    BUZToken.deploy(owner, {'from': deployer})
