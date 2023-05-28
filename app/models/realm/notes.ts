import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class Note extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    note!: string;
    userId!: string;
    createdAt!: Date;

    static schema = {
        name: "Note",
        properties: {
            _id: "objectId",
            note: "string",
            createdAt: "date"
        }
    }
}

export const noteRealmContext = createRealmContext({
  schema: [Note],
  deleteRealmIfMigrationNeeded: true,
});