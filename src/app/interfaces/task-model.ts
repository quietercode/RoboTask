export interface TaskModel {
    id: string;
    name: string;
    complete: boolean;
    user: any;
    created: Date;
    updated: Date;
    editMode: boolean;
}
