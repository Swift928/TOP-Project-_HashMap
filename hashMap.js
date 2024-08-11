class HashMap {
    constructor(size = 16) {
        this.size = size;
        this.keyMap = Array.from({ length: size }, () => []);
        this.count = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeValue = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * primeValue + key.charCodeAt(i)) % this.size;
        }
        return hashCode;
    }

    loadFactor() {
        return this.count / this.size;
    }

    resize() {
        this.size = this.size * 2;

        const previousMap = this.keyMap;
        this.keyMap = Array.from({ length: this.size }, () => []);
        this.count = 0;

        for (let bucket of previousMap) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    this.set(key, value);
                }
            }
        }
    }

    set(key, value) {
        let hashCode = this.hash(key);

        if (hashCode < 0 || hashCode >= this.keyMap.length) {
            throw new Error('Trying to access index out of bound');
        }

        let keyExists = false;
        for (let i = 0; i < this.keyMap[hashCode].length; i++) {
            if (this.keyMap[hashCode][i][0] === key) {
                this.keyMap[hashCode][i][1] = value;

                keyExists = true;
                break;
            }
        }

        if (!keyExists) {
            this.keyMap[hashCode].push([key, value]);
            this.count += 1;

            if (this.loadFactor() > 0.75) {
                this.resize();
            }
        }
    }

    get(key) {
        let hashCode = this.hash(key);

        if (hashCode < 0 || hashCode >= this.keyMap.length) {
            throw new Error('Trying to access index out of bound');
        }

        if (this.keyMap[hashCode]) {
            for (let i = 0; i < this.keyMap[hashCode].length; i++) {
                if (this.keyMap[hashCode][i][0] === key) {
                    return this.keyMap[hashCode][i][1];
                }
            }
        }

        return null;
    }

    has(key) {
        return this.get(key) !== null ? true : false;
    }

    remove(key) {
        let hashCode = this.hash(key);

        if (hashCode < 0 || hashCode >= this.keyMap.length) {
            throw new Error('Trying to access index out of bound');
        }

        for (let i = 0; i < this.keyMap[hashCode].length; i++) {
            if (this.keyMap[hashCode][i][0] === key) {
                this.keyMap[hashCode].splice(i, 1);
                this.count -= 1;

                if (this.keyMap[hashCode].length === 0) {
                    this.keyMap[hashCode] = [];
                }

                return true;
            }
        }
        return false;
    }

    length() {
        return this.count;
    }

    clear() {
        this.size = 16;
        this.keyMap = Array.from({ length: this.size }, () => []);
        this.count = 0;
    }

    keys() {
        const keys = [];

        for (let bucket of this.keyMap) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    keys.push(key);
                }
            }
        }
        return keys;
    }

    values() {
        const values = [];

        for (let bucket of this.keyMap) {
            if (bucket) {
                for (let [, value] of bucket) {
                    values.push(value);
                }
            }
        }
        return values;
    }

    entries() {
        const entries = [];

        for (let bucket of this.keyMap) {
            if (bucket) {
                for (let entry of bucket) {
                    entries.push(entry);
                }
            }
        }
        return entries;
    }

    display() {
        console.log('HashMap contents:');
        for (let i = 0; i < this.size; i++) {
            if (this.keyMap[i].length > 0) {
                console.log(`Bucket ${i}:`, this.keyMap[i]);
            }
        }
    }
}

module.exports = HashMap;
