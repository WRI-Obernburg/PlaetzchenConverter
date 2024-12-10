/// <reference types="./openscad.d.ts" />
let wasmModule;
async function OpenSCAD(options) {
    if (!wasmModule) {
        const url = new URL(`./openscad.js`, self.location.origin + "/").href;
        const request = await fetch(url);
        wasmModule = "data:text/javascript;base64," + btoa(await request.text());
    }
    console.log("fetched wasm module");
    const module = {
        noInitialRun: true,
        locateFile: (path) => new URL(`./${path}`, self.location.origin + "/").href,
        ...options,
    };
    //original code: import OpenSCAD from "./openscad.js";
    // const instance = await OpenSCAD({noInitialRun: true});
    //converted code:
    const openscad = await import(wasmModule + `#${Math.random()}`);
    const instance = await openscad.default(module);
    console.log("imported openscad");


    return instance;
}

// Portions of this file are Copyright 2021 Google LLC, and licensed under GPL2+. See COPYING.
const zipArchives = {
    'fonts': {},
    'openscad': {
        description: 'OpenSCAD',
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/openscad/openscad',
            include: [{ glob: ['examples/*.scad', 'LICENSE'] }],
        },
        docs: {
            'CheatSheet': 'https://openscad.org/cheatsheet/index.html',
            'Documentation': 'https://openscad.org/documentation.html',
        },
    },
    'MCAD': {
        description: 'OpenSCAD Parametric CAD Library',
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/openscad/MCAD',
            include: [{ glob: ['*.scad', 'bitmap/*.scad', 'LICENSE'] }],
        },
    },
    'BOSL': {
        description: 'The Belfry OpenScad Library',
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/revarbat/BOSL',
            include: [{ glob: ['**/*.scad', 'LICENSE'] }],
        },
    },
    'BOSL2': {
        description: 'The Belfry OpenScad Library, v2.0',
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/BelfrySCAD/BOSL2',
            include: [{ glob: ['**/*.scad', 'LICENSE'] }],
        },
        docs: {
            'CheatSheet': 'https://github.com/BelfrySCAD/BOSL2/wiki/CheatSheet',
            'Wiki': 'https://github.com/BelfrySCAD/BOSL2/wiki',
        },
    },
    'NopSCADlib': {
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/nophead/NopSCADlib',
            include: [{
                glob: '**/*.scad',
                ignore: 'test/**',
            }],
        },
    },
    'boltsparts': {
        description: 'OpenSCAD library for generating bolt/nut models',
        gitOrigin: {
            branch: 'main',
            repoUrl: 'https://github.com/boltsparts/boltsparts',
            include: [{
                glob: 'openscad/**/*.scad',
                ignore: 'test/**',
            }],
        },
        docs: {
            'Usage': 'https://boltsparts.github.io/en/docs/0.3/document/openscad/usage.html',
        },
    },
    'brailleSCAD': {
        gitOrigin: {
            branch: 'main',
            repoUrl: 'https://github.com/BelfrySCAD/brailleSCAD',
            include: [{
                glob: ['**/*.scad', 'LICENSE'],
                ignore: 'test/**',
            }],
        },
        docs: {
            'Documentation': 'https://github.com/BelfrySCAD/brailleSCAD/wiki/TOC',
        },
    },
    'FunctionalOpenSCAD': {
        description: 'Implementing OpenSCAD in OpenSCAD',
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/thehans/FunctionalOpenSCAD',
            include: [{ glob: ['**/*.scad', 'LICENSE'] }],
        },
    },
    'OpenSCAD-Snippet': {
        description: 'OpenSCAD Snippet Library',
        gitOrigin: {
            branch: 'main',
            repoUrl: 'https://github.com/AngeloNicoli/OpenSCAD-Snippet',
            include: [{ glob: ['**/*.scad', 'LICENSE'] }],
        },
        symlinks: {
            'Asset_SCAD': 'Asset_SCAD',
            'Import_Library.scad': 'Import_Library.scad',
        },
    },
    'funcutils': {
        description: 'OpenSCAD collection of functional programming utilities, making use of function-literals.',
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/thehans/funcutils',
            include: [{ glob: '**/*.scad' }],
        },
    },
    'smooth-prim': {
        description: 'OpenSCAD smooth primitives library',
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/rcolyer/smooth-prim',
            include: [{ glob: ['**/*.scad', 'LICENSE.txt'] }],
        },
        symlinks: { 'smooth_prim.scad': 'smooth_prim.scad' },
    },
    'closepoints': {
        description: 'OpenSCAD ClosePoints Library',
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/rcolyer/closepoints',
            include: [{ glob: ['**/*.scad', 'LICENSE.txt'] }],
        },
        symlinks: { 'closepoints.scad': 'closepoints.scad' },
    },
    'plot-function': {
        description: 'OpenSCAD Function Plotting Library',
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/colyer/plot-function',
            include: [{ glob: ['**/*.scad', 'LICENSE.txt'] }],
        },
        symlinks: { 'plot_function.scad': 'plot_function.scad' },
    },
    // 'threads': {
    //   deployed: false,
    //   gitOrigin: {
    //     branch: 'master',
    //     repoUrl: 'https://github.com/colyer/threads',
    //     include: [{glob: ['**/*.scad', 'LICENSE.txt']}],
    //   },
    // },
    'openscad-tray': {
        description: 'OpenSCAD library to create rounded rectangular trays with optional subdividers.',
        gitOrigin: {
            branch: 'main',
            repoUrl: 'https://github.com/sofian/openscad-tray',
            include: [{ glob: ['**/*.scad', 'LICENSE'] }],
        },
        symlinks: { 'tray.scad': 'tray.scad' },
    },
    'lasercut': {
        description: 'Module for OpenSCAD, allowing 3D models to be created from 2D lasercut parts.',
        gitOrigin: {
            branch: 'master',
            repoUrl: 'https://github.com/bmsleight/lasercut',
            include: [{ glob: ['**/*.scad', 'LICENSE'] }],
        },
        symlinks: { 'lasercut.scad': 'lasercut.scad' },
    },
    'YAPP_Box': {
        description: 'Yet Another Parametric Projectbox Box',
        gitOrigin: {
            branch: 'main',
            repoUrl: 'https://github.com/mrWheel/YAPP_Box',
            include: [{ glob: ['**/*.scad', 'LICENSE'] }],
        },
    },
    'Stemfie_OpenSCAD': {
        description: 'OpenSCAD Stemfie Library',
        gitOrigin: {
            branch: 'main',
            repoUrl: 'https://github.com/Cantareus/Stemfie_OpenSCAD',
            include: [{ glob: ['**/*.scad', 'LICENSE'] }],
        },
    },
    'UB.scad': {
        gitOrigin: {
            branch: 'main',
            repoUrl: 'https://github.com/UBaer21/UB.scad',
            include: [{
                glob: ['libraries/*.scad', 'LICENSE', 'examples/UBexamples/*.scad'], replacePrefix: {
                    'libraries/': '',
                    'examples/UBexamples/': 'examples/',
                }
            }],
        },
        symlinks: { "ub.scad": "libraries/ub.scad" }, // TODO change this after the replaces work
    },
    'pathbuilder': {
        gitOrigin: {
            branch: 'main',
            repoUrl: 'https://github.com/dinther/pathbuilder.git',
            include: [{ glob: ['**/*.scad', 'LICENSE'] }],
        },
    },
    'openscad_attachable_text3d': {
        gitOrigin: {
            branch: 'main',
            repoUrl: 'https://github.com/jon-gilbert/openscad_attachable_text3d.git',
            include: [{ glob: ['**/*.scad', 'LICENSE'] }],
        },
    },
};
const deployedArchiveNames = Object.entries(zipArchives)
    .filter(([_, { deployed }]) => deployed == null || deployed)
    .map(([n]) => n);

// Portions of this file are Copyright 2021 Google LLC, and licensed under GPL2+. See COPYING.
async function getBrowserFSLibrariesMounts(archiveNames) {
    const Buffer = BrowserFS.BFSRequire('buffer').Buffer;
    const fetchData = async (url) => (await fetch(url)).arrayBuffer();
    const results = await Promise.all(archiveNames.map(async (n) => [n, await fetchData(`./libraries/${n}.zip`)]));
    const zipMounts = {};
    for (const [n, zipData] of results) {
        zipMounts[n] = {
            fs: "ZipFS",
            options: {
                zipData: Buffer.from(zipData)
            }
        };
    }
    return zipMounts;
}
async function symlinkLibraries(archiveNames, fs, prefix = '/libraries', cwd = '/tmp') {
    const createSymlink = async (target, source) => {
        // console.log('symlink', target, source);
        try {
            await fs.symlink(target, source);
        }
        catch (e) {
            console.error(`symlink(${target}, ${source}) failed: `, e);
        }
        // await symlink(target, source);
    };
    await Promise.all(archiveNames.map(n => (async () => {
        if (!(n in zipArchives))
            throw new Error(`Archive named ${n} invalid (valid ones: ${deployedArchiveNames.join(', ')})`);
        const { symlinks } = (zipArchives)[n];
        if (symlinks) {
            for (const from in symlinks) {
                const to = symlinks[from];
                const target = to === '.' ? `${prefix}/${n}` : `${prefix}/${n}/${to}`;
                const source = from.startsWith('/') ? from : `${cwd}/${from}`;
                await createSymlink(target, source);
            }
        }
        else {
            await createSymlink(`${prefix}/${n}`, `${cwd}/${n}`);
        }
    })()));
}
function configureAndInstallFS(windowOrSelf, options) {
    return new Promise(async (resolve, reject) => {
        BrowserFS.install(windowOrSelf);
        try {
            BrowserFS.configure(options, function (e) {
                if (e)
                    reject(e);
                else
                    resolve(null);
            });
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    });
}
async function createEditorFS({ prefix, allowPersistence }) {
    const archiveNames = deployedArchiveNames;
    const allMounts = {};

    await configureAndInstallFS(typeof window === 'object' && window || self, {
        fs: "OverlayFS",
        options: {
            readable: {
                fs: "MountableFileSystem",
                options: Object.assign({}, allMounts)
            },
            writable: allowPersistence ? {
                fs: "LocalStorage",
            } : {
                fs: "InMemory"
            },
        },
    });
    var fs = BrowserFS.BFSRequire('fs');
    // const symlink = (target, source) => new Promise((res, rej) => fs.symlink(target, source, (err) => err ? rej(err) : res()));
    // await setupLibraries(archiveNames, symlink, '/libraries', workingDir);
    return fs;
}

// Portions of this file are Copyright 2021 Google LLC, and licensed under GPL2+. See COPYING.
importScripts("browserfs.min.js");
addEventListener('message', async (e) => {
    console.log("message from main thread");
    var _a, _b;
    const { inputs, args, outputPaths, wasmMemory, svgFile } = e.data;
    const mergedOutputs = [];
    console.log("creating openscad");

    try {
        const instance = await OpenSCAD({
            wasmMemory,
            buffer: wasmMemory && wasmMemory.buffer,
            noInitialRun: true,
            'print': (text) => {
                console.log('stdout: ' + text);
                mergedOutputs.push({ stdout: text });
            },
            'printErr': (text) => {
                console.error('stderr: ' + text);
                mergedOutputs.push({ stderr: text });
            },
        });
        console.log("created openscad");
        console.log(instance)

        // This will mount lots of libraries' ZIP archives under /libraries/<name> -> <name>.zip
        // await createEditorFS({ prefix: '', allowPersistence: false });
        // instance.FS.mkdir('/libraries');
        // https://github.com/emscripten-core/emscripten/issues/10061
        //const BFS = new BrowserFS.EmscriptenFS(instance.FS, (_a = instance.PATH) !== null && _a !== void 0 ? _a : {
        ////    join2: (a, b) => `${a}/${b}`,
        join: (...args) => args.join('/'),
            // }, (_b = instance.ERRNO_CODES) !== null && _b !== void 0 ? _b : {});
            //instance.FS.mount(BFS, { root: '/' }, '/libraries');
            // await symlinkLibraries(deployedArchiveNames, instance.FS, '/libraries', "/");
            // Fonts are seemingly resolved from $(cwd)/fonts
            // instance.FS.chdir("/");
            instance.FS.writeFile("/import.svg", svgFile);
        if (inputs) {
            for (const [path, content] of inputs) {
                try {
                    // const parent = getParentDir(path);
                    instance.FS.writeFile(path, content);
                    // fs.writeFile(path, content);
                }
                catch (e) {
                    console.error(`Error while trying to write ${path}`, e);
                }
            }
        }
        console.log('Invoking OpenSCAD with: ', args);
        const start = performance.now();
        const exitCode = instance.callMain(args);
        const end = performance.now();
        const outputs = [];
        for (const path of (outputPaths !== null && outputPaths !== void 0 ? outputPaths : [])) {
            try {
                const content = instance.FS.readFile(path);
                outputs.push([path, content]);
            }
            catch (e) {
                console.trace(`Failed to read output file ${path}`, e);
            }
        }
        const result = {
            outputs,
            mergedOutputs,
            exitCode,
            elapsedMillis: end - start
        };
        console.debug(result);
        postMessage(result);
    }
    catch (e) {
        console.trace(e); //, e instanceof Error ? e.stack : '');
        const error = `${e}`;
        mergedOutputs.push({ error });
        postMessage({
            error,
            mergedOutputs,
        });
    }
});
