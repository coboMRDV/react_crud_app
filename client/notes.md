### Embed youtube video with tailwind css

`<div class="relative" style="padding-top: 56.25%">`
`<iframe class="absolute inset-0 w-full h-full" src="https://www.youtube-nocookie.com/embed/FMrtSHAAPhM" frameborder="0" …></iframe>`
`</div>`

### RTMP NodeMediaServer is not a constructor error fix

In the next lecture we will install the Node Media Server package and create our RTMP server. Our index.js needs a slight modification to the import for v.2.1.0

[version recommended](https://github.com/illuspas/Node-Media-Server#npm-version-recommended)

Instead of:

const { NodeMediaServer } = require('node-media-server');
we need to change the import to this:

const NodeMediaServer = require('node-media-server');
