# NueCMS Plugin Example

This repository contains an example plugin for NueCMS to demonstrate how to create and configure plugins within the NueCMS ecosystem.

## Overview

This example plugin showcases the basic structure and configuration options available when developing plugins for NueCMS. Use this as a starting point or reference for creating your own custom plugins.

## Plugin Structure

- `manifest.json` - Plugin configuration file with metadata and settings
- Additional files would include your plugin logic, assets, and components

## Configuration

The plugin is configured through the `manifest.json` file with the following properties:

```json
{
  "key": "example",
  "name": "Example Plugin",
  "description": "An example plugin to demonstrate the plugin system",
  "version": "1.0.0", 
  "author": "NueCMS",
  "config": {
    "setting1": "value1",
    "enableFeature": true,
    "maxItems": 10
  }
}
```

### Configuration Options

- `setting1`: Example text setting
- `enableFeature`: Boolean flag to enable/disable functionality
- `maxItems`: Numeric value to control item limits

## Installation

To install this plugin in your NueCMS instance:

1. Clone or download this repository
2. Place the plugin folder in your NueCMS plugins directory
3. Restart or refresh your NueCMS application

## Development

To develop and extend this plugin:

1. Modify the `manifest.json` to update metadata and configuration
2. Add your custom functionality in appropriate files
3. Test your plugin within a NueCMS environment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


