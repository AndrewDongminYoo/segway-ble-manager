# Changelog

## [0.3.0](https://github.com/AndrewDongminYoo/segway-ble-manager/compare/v0.2.0...v0.3.0) (2024-04-11)

### Features v0.3.0

- **android:** :sparkles: implemented android interfaces ([fcf8d82](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/fcf8d82d8527174d3d3462dd4aec3df333671a27))
- **android:** ⬆️ sd_ble_sdk restroed ([59c015a](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/59c015a0f464913245322ca8f4dc548362bead36))
- **android:** 🔥 all async functions is switched to sync function ([e78f7c0](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/e78f7c0715a20c46dfe95a1407e8f35f4c64b6ab))
- **application:** ♻️ increased stability with type guards ([7cf3216](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/7cf3216820699f57a3b84de7cefb32a6637b2b66))
- **application:** ⚡️ modified Example Application Codes ([0651ee0](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/0651ee04b56c94b9b6f8cef38c55a0f9ec9943eb))
- **application:** ⬆️ upgraded all dependencies and installed react-native-permissions ([bd140f8](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/bd140f8ff4f70b6da19085b7c1b1da4c544d0af7))
- **application:** 💄 changed JS interfaces and Example application's UI ([f384acd](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/f384acd1e4b13896f6846895a942b304d1ea5663))
- **iOS:** ♻️ names of vehicleInfo and IoTinfo was same, so changed its names ([08eab86](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/08eab8606e339d918f53eaa7aa1ef9a66c735d7c))
- **iOS:** ✨ formally implemented iOS interfaces ([f372912](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/f3729126bae9336d87c7a3eb16d3988c99a70078))

### Bug Fixes v0.3.0

- 🔒️ fix all critical vulnerability issues ([a46f1d1](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/a46f1d130f58be1e2b4827167e510fb6e414d35b))
- **android:** 🐛 kt-gradle version downgrade ([7697328](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/7697328b5a421480f80db81a97372d12fea360f2))
- **android:** 🐛 unnecessary and overlapping authority requests have been sorted out ([23dad8e](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/23dad8e2911b7045c0cb20a346c73424b698cfae))
- **android:** 💚 fixed gradle's pre-build scripts and configurations ([b03f20b](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/b03f20bf221b842bc9c5741d5ac67b9e6c96a7bf))
- **android:** 📌 fix android kotlin version and gradle plugin version ([d685dc0](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/d685dc021fdf53b9eb56099cd1fb43c7a579f20d))
- **android:** 🔥 add `getConstants` for TurboModule so we can manage common constants ([26fb6dc](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/26fb6dce6a498c13523b19efb8cca46e53a189f0))
- **android:** dynamic version error resolved ([8989b3d](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/8989b3dfb55e3274e831f0ae2c5d0c4a047760af))
- **android:** fix connect method callback function ([7ef6e2a](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/7ef6e2ae2825a9dc07a01cf0380181598797d39a))
- **application:** 💄 modified element of example app ([2f3054c](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/2f3054c3c77098b0ba3e1569fc31559f188a0baf))
- **application:** 🚑️ accidentally swapped type definitions - fixed ([c579d66](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/c579d6676c2aa98fb94e1aae3a8d5d0f105053e0))
- **application:** 🚧 working in progress:: it is not prepared every scenario ([bd49c59](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/bd49c59d627c7227a089db5e568eb23b843eb667))
- **react:** 🚑️ vulnerabilities found - `jsdoc > taffydb` ([4eaa4a0](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/4eaa4a0ac44d3a5394d56eda7ca46f0da29da7ed))
- upgrade react-native from 0.71.6 to 0.71.7 ([9d735cd](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/9d735cd07d82ea4c2a7e9021fc17ebabc2756413))

### Performance Improvements v0.3.0

- ⬆️ upgrade yarn version to yarn berry ([85dd134](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/85dd134a064b684c398f2103635898de94ec6c7c))
- 🏗️ Migrated Android code to Kotlin instead of Java, updated Gradle build settings ([066c91d](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/066c91dc3863d25c78f3d1c2d3e6410476c2a75a))
- **android:** 🔥 remove unnecessary return values ([b1c2906](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/b1c290655245927e8821049bc8f110d5e3abac9f))
- **application:** ⚡️ explicitly wrote complex synchronous method return first, report later ([63928b1](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/63928b1ab17e663fd525389049386d74c178d544))
- **application:** ⚡️ reverted to asynchronous functions ([0eb07a4](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/0eb07a438b7fb0eaa6d3a8bd8eee4811b2d8a321))
- **react-native:** 🔨 scripts from `react-native-step-counter` ([902da0d](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/902da0db45f696cc5afc820ae3ce7cee8e4d53ec))
- **react:** ⚡️ aliases to the code split files ([b3ce15e](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/b3ce15e1d6cd8b7c8c29081ca51f988c9ca4ed19))

### Documentation v0.3.0

- 📝 module's interface consists ([476ad3d](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/476ad3de284a6b43360838e205261c3f45fb41be))
- 📝 Reformatting documentation files, updating contribution guides and readme files ([cd6076b](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/cd6076bd4a5e93489e3df69cb7149fe522b24088))
- 📝 regenerate package documents ([216ffbe](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/216ffbe1a67537f24790e3d8f527b14c1fe2bd83))
- **application:** 📝 build auto-generated postman document with jsdoc ([68841df](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/68841df00bcd804d69d08d868634a5db13de673c))
- **application:** 📝 the module interface has been slightly modified ([d7efc06](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/d7efc06607fac3538be2248620d733c563094ddb))
- **application:** 🔧 many changes related with JSDoc ([cee5858](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/cee5858c3650ecece42b907fcbb287a70bc3608a))
- **application:** wrote many many JSDoc block comments ([b5de902](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/b5de90291d71af8ef3ab2bb1ce7a315f1d779b26))
- **react:** 📝 finish documentation ([214be34](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/214be34f83a2760f8eaf5ec3bfda76c90a49aeff))

## [0.2.0](https://github.com/AndrewDongminYoo/segway-ble-manager/compare/v0.1.3...v0.2.0) (2023-04-11)

### Features v0.2.0

- **android:** ⬆️ sd_ble_sdk restored ([1401513](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/1401513855a1b67f0f705c02b72a3a371f91734c))

### Bug Fixes v0.2.0

- **android:** 🐛 kt-gradle version downgrade ([f2b653a](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/f2b653a249f8d2ff1751c6732043402629129f7e))
- **android:** dynamic version error resolved ([0e709a4](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/0e709a4a339da11b88f32cdbe8b3184c0b467f6b))
- **react:** 🚑️ vulnerabilities found - `jsdoc > taffydb` ([f598c80](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/f598c80bb9f6e25443d116d642c72fe6407fd150))

### Documentation v0.2.0

- 📝 module's interface consists ([bd19729](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/bd197291aab53c5079e36fbf1e8fb47a7b4c48d8))
- **react:** 📝 finish documentation ([f6789d4](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/f6789d4d872a2b8970fd8fdfffa3a99f53ee3cba))

## [0.1.3](https://github.com/AndrewDongminYoo/segway-ble-manager/compare/v0.1.2...v0.1.3) (2023-04-04)

### Performance Improvements v0.1.3

- **application:** ⚡️ reverted to asynchronous functions ([3f626eb](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/3f626eb56a0704beea9cfb3dd3bf46afe427a4df))

### Documentation v0.1.3

- **application:** 📝 build auto-generated postman document with jsdoc ([e00e1f2](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/e00e1f2acc2555ad4cf0a9e9de92660e85ce752d))
- **application:** 📝 the module interface has been slightly modified ([07a8998](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/07a89981add6bb9b6e85da34c6638417f346e242))

## [0.1.2](https://github.com/AndrewDongminYoo/segway-ble-manager/compare/v0.1.0-beta.0...v0.1.2) (2023-04-04)

## [0.1.1](https://github.com/AndrewDongminYoo/segway-ble-manager/compare/v0.1.0-beta.0...v0.1.1) (2023-04-04)

## 0.1.0-beta.0 (2023-04-03)

### Features

- **android:** ✨ implemented android interfaces ([fcf8d82](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/fcf8d82d8527174d3d3462dd4aec3df333671a27))
- **android:** 🔥 all async functions is switched to sync function ([e78f7c0](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/e78f7c0715a20c46dfe95a1407e8f35f4c64b6ab))
- **application:** ♻️ increased stability with type guards ([f7cb0ff](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/f7cb0ff26318d3ae414ea174a8c80f7aaaeaa2d3))
- **application:** ⚡️ modified Example Application Codes ([58a56a2](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/58a56a2f29146ab337925785fc5b3a1d6e3f3a6c))
- **application:** ⬆️ upgraded all dependencies and installed react-native-permissions ([bd140f8](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/bd140f8ff4f70b6da19085b7c1b1da4c544d0af7))
- **application:** 💄 changed JS interfaces and Example application's UI ([f384acd](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/f384acd1e4b13896f6846895a942b304d1ea5663))
- **iOS:** ♻️ names of vehicleInfo and IoTInfo was same, so changed its names ([08eab86](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/08eab8606e339d918f53eaa7aa1ef9a66c735d7c))
- **iOS:** ✨ formally implemented iOS interfaces ([f372912](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/f3729126bae9336d87c7a3eb16d3988c99a70078))

### Bug Fixes

- **android:** 🐛 unnecessary and overlapping authority requests have been sorted out ([23dad8e](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/23dad8e2911b7045c0cb20a346c73424b698cfae))
- **android:** 🔥 add `getConstants` for TurboModule so we can manage common constants ([26fb6dc](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/26fb6dce6a498c13523b19efb8cca46e53a189f0))
- **android:** fix connect method callback function ([a0bbbcf](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/a0bbbcf8a1d767284469a23f7639b0ea6e72ae2e))
- **application:** 💄 modified element of example app ([05dd4c8](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/05dd4c87c44c0e96f3377522b2bf3f5d5db24be7))
- **application:** 🚑️ accidentally swapped type definitions - fixed ([b107efe](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/b107efe146d8f548fb4ae45400cde3bfe28f36f2))
- **application:** 🚧 working in progress:: it is not prepared every scenario ([dc7d3b9](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/dc7d3b950a2b711d8a154d9aecb5b52298230b92))

### Performance Improvements

- **android:** 🔥 remove unnecessary return values ([b5d0b5d](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/b5d0b5dae8cb7c00af8702258c07e2abda509a3a))
- **application:** ⚡️ explicitly wrote complex synchronous method return first, report later ([63928b1](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/63928b1ab17e663fd525389049386d74c178d544))
- **application:** 🔨 scripts from `react-native-step-counter` ([902da0d](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/902da0db45f696cc5afc820ae3ce7cee8e4d53ec))

### Documentation

- **application:** 🔧 many changes related with JSDoc ([8f7e31c](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/8f7e31ca226803ae6d38ada978147d5e5f9eb020))
- **application:** 📝 wrote many many JSDoc block comments ([d8d4ff4](https://github.com/AndrewDongminYoo/segway-ble-manager/commit/d8d4ff49c2313c73a2cec7d9798f775dcd07c6bd))
