import {Component, Input, EventEmitter} from "angular2/core";
import {HTTP_PROVIDERS, Headers} from "angular2/http";

import {LaputinService} from "./laputinservice";
import {File} from "./file";
import {Tag} from "./tag";
import {TagAutocompleteComponent} from "./tagautocomplete.component";

@Component({
    selector: "file-row",
    template: `
        <div>
            <div *ngIf="!detailsOpen">
                <p><a (click)="toggle()">{{file.path}}</a></p>
                
                <p>
                    <span *ngFor="#tag of file.tags">
                        {{tag.name}}
                    </span>
                </p>
            </div>
        
            <div *ngIf="detailsOpen">
                <p><strong><a (click)="toggle()">{{file.path}}</a></strong></p>
            
                <div class="row">
                    <div class="col-md-2">
                        <p>
                            <tag-autocomplete (select)="addTag($event)"></tag-autocomplete>
                        </p>
                        
                        <p>
                            <small><a (click)="toggleTagCreation()">Didn't find the tag you were looking for..?</a></small>
                        </p>
                        
                        <div *ngIf="tagCreationOpen">
                            <form>
                                <input type="text" [(ngModel)]="newTag" placeholder="Create a new tag" class="form-control" />
                                <button (click)="addNewTag()">Add tag</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="col-md-10">
                        <p><img src="http://localhost:3200/media/{{file.name}}" width="320" /></p>
                    
                        <p>
                            <span *ngFor="#tag of file.tags">
                                <button (click)="removeTag(tag)" class="btn btn-success tag">{{tag.name}}</button>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>`,
    providers: [LaputinService, HTTP_PROVIDERS],
    directives: [TagAutocompleteComponent]
})
export class FileRowComponent {
    public newTag: string = "";
    
    @Input() file: File;
    
    public detailsOpen: boolean = false;
    public tagCreationOpen: boolean = false;
    
    constructor(private _service: LaputinService) {
    }
    
    public toggle(): void {
        this.detailsOpen = !this.detailsOpen;
    }
    
    public toggleTagCreation(): void {
        this.tagCreationOpen = !this.tagCreationOpen;
    }
    
    public addNewTag(): void {
        this._service.createTag(this.file, this.newTag)
                     .subscribe(tag => {
                        this._service.addTag(this.file, tag)
                            .subscribe(() => this.addTagToFile(tag));
                     });
        this.newTag = "";
    }
    
    public addTag(tag: Tag): void {
        this._service.addTag(this.file, tag)
                     .subscribe(() => this.addTagToFile(tag));
    }
    
    public removeTag(tag: Tag): void {
        var tags = this.file.tags;
        this.file.tags = _.filter(this.file.tags, (t: Tag): boolean => t.id !== tag.id);
        this._service.deleteTagFileAssoc(this.file, tag)
            .subscribe(() => {});
    }
    
    private addTagToFile(tag: Tag): void {
        var tags = this.file.tags;
        tags.push(tag);
        var sorted = _.sortBy(tags, (tag) => tag.name);
        this.file.tags = sorted;
    }
    
    public onSelect(file: File): void {
        this._service.openFile(file);
    }
}