import { SqlStorage } from 'ionic-angular';

/**
 * PreferencesDAO class is responsible for accessing the memory reserved
 * for the user preferences.
 * 
 * @export
 * @class {PreferencesDAO}
 */
export class PreferencesDAO {

    private baseCollectionName: string = 'prefs';
    private storage: SqlStorage;

    public constructor() {
        this.storage = new SqlStorage();
    }

    /**
     * Retrieves the preference stored in the given key.
     * 
     * @template T
     * @param {string} key - Preference identifier
     * @returns {Promise<T>}
     */
    public getKey<T>(key: string): Promise<T> {
        return this.storage.get(`${this.baseCollectionName}.${key}`)
        .then(value => {
            let tmp: T;
            try {
                tmp = <T> JSON.parse(value);
            } catch (e) {
                tmp = null;
            } finally {
                return tmp;
            }
        });
    }

    /**
     * Saves a preference in the given key.
     * 
     * @param {string} key - Preference identifier
     * @param {*} value - Value to store
     * @returns {Promise<void>}
     */
    public setKey(key: string, value: any): Promise<void> {
        return this.storage.set(`${this.baseCollectionName}.${key}`, JSON.stringify(value));
    }
}
