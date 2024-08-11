class HashSet {
    constructor(size = 16) {
        this.size = size;
        this.keySet = Array.from({ length: size }, () => []);
        this.count = 0;
    }

    hash(key) {
        let hashCode = 0;
        let primeValue = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeValue * hashCode + key.charCodeAt(i)) % this.size;
        }

        return hashCode;
    }

    loadFactor() {
        return this.count / this.size;
    }

    resize() {
        this.size = this.size * 2;

        const oldKeySet = this.keySet;
        this.keySet = Array.from({ length: this.size }, () => []);
        this.count = 0;

        for (const bucket of oldKeySet) {
            if (bucket) {
                for (let key of bucket) {
                    this.set(key);
                }
            }
        }
    }

    set(key) {
        let hashCode = this.hash(key);

        let keyExists = false;
        for (let i = 0; i < this.keySet[hashCode].length; i++) {
            if (this.keySet[hashCode][i][0] === key) {
                keyExists = true;
                break;
            }
        }

        if (!keyExists) {
            this.keySet[hashCode].push(key);
            this.count += 1;

            if (this.loadFactor() > 0.75) {
                this.resize();
            }
        }
    }

    has(key) {
        let hashCode = this.hash(key);

        for (let i = 0; i < this.keySet[hashCode].length; i++) {
            if (this.keySet[hashCode][i] === key) {
                return true;
            }
        }

        return false;
    }

    remove(key) {
        let hashCode = this.hash(key);

        for (let i = 0; i < this.keySet[hashCode].length; i++) {
            if (this.keySet[hashCode][i] === key) {
                this.keySet[hashCode].splice(i, 1);
                this.count -= 1;
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
        this.keySet = Array.from({ length: this.size }, () => []);

        this.count = 0;
    }

    entries() {
        let keysArray = [];

        for (const bucket of this.keySet) {
            for (const key of bucket) {
                keysArray.push(key);
            }
        }

        return keysArray;
    }

    display() {
        console.log('HashSet contents:');
        for (let i = 0; i < this.size; i++) {
            if (this.keySet[i] && this.keySet[i].length > 0) {
                console.log(`Bucket ${i}:`, this.keySet[i]);
            }
        }
    }
}
