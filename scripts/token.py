#!/usr/bin/python3

from brownie import Token, accounts
import os

def main():
    deployer = accounts.add(os.getenv("DEPLOYER_PRIVATE_KEY"))
    return Token.deploy("DEVToken", "DEV", 18, 1e21, {'from': deployer})
