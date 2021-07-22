# WagoNorge B.Sc 2021 OpenBridge MTP
This repository contains a revised version and a detailed installation guide of a bachelor written for Wago Norge the spring of 2021. 

Credits to the original authors:
   - Pål Kristian Ofstad
   - Eskil G. Gaustad
   - Ørjan Pettersen
   - Frode Kvalnes
    
## Info
The repository contains:
   - A e!COCKPIT program that simulates the dynamics of ship. And a visialization with simple controlls. 
   - A Docker-image containing:
      - A webserver hosting a HMI that uses OpenBridge elements. 
      - An OPCUA-client that uses the Node-OPCUA library.

Programming languages:
   - CoDeSys
   - Javascript
   - HTML 5

# Installation

## Prerequisites
- An SSH client (PuTTY for example)
- Internet connection on the device


## Setup in Web Based Management
### Settings
1. Configuration -> Networking -> TCP/IP Cofiguration
      - IP Source: Static IP
      - Set an IP address and Subnet Mask that is accessible and corresponds with the local network router. 
      - Manually assign a DNS server. e.g: 8.8.8.8 
2. ... -> ... -> Routing
      - IP Forwarding through multiple interfaces: Enabled
      - Default Static Routes. Set it up with the router. 
3. ... -> PLC runtine. PLC Runtime Version: e!RUNTIME. 
4. ... -> Ports and Services -> PLC Runtime Services. e!RUNTIME: Webserver Enabled. 
5. ... -> Browser Settings -> Favourites 
      - Ad the HMI webserver: http://localhost:9999
6. Fieldbus -> OPCUA -> Configuration
      - Service Enabled: yes
      - Ctrl Configuration name (e.g.): WAGO OPCUA TP600.
      - Unlimited Anonynous Access: yes
      - Security Policy - None: yes
      - Trust all clients: yes



### Installing docker (required)

Follow this guide: https://github.com/WAGO/docker-ipk

## Installing the e!COCKPIT Program
Download and


## Installing the Docker-container

# Changelog

## 07.2021

