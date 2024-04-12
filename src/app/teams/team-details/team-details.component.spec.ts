import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { Team } from '../team';
import { TeamService } from '../team.service';

import { TeamDetailsComponent } from './team-details.component';

describe('TeamDetailsComponent', () => {
  let component: TeamDetailsComponent;
  let fixture: ComponentFixture<TeamDetailsComponent>;
  let mockRouter: any;
  let mockActivatedRoute: any;
  let mockTeamService: any;
  let mockDialog: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockActivatedRoute = {
      snapshot: { paramMap: convertToParamMap({ id: '1' }) }
    };
    mockTeamService = jasmine.createSpyObj('TeamService', ['getTeam', 'deleteTeam']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ TeamDetailsComponent ],
      imports: [MatDialogModule, MatSnackBarModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TeamService, useValue: mockTeamService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch team data on ngOnInit', () => {
    const mockTeam: Team = { _id: '1', name: 'Test Team' };
    mockTeamService.getTeam.and.returnValue(of(mockTeam));

    component.ngOnInit();

    expect(mockTeamService.getTeam).toHaveBeenCalledWith('1');
    expect(component.team).toEqual(mockTeam);
  });

  it('should open confirm delete dialog on deleteTeam', () => {
    component.team = { _id: '1', name: 'Test Team' };
    component.openConfirmDeleteDialog();

    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should delete team on deleteItem', () => {
    component.team = { _id: '1', name: 'Test Team' };
    mockTeamService.deleteTeam.and.returnValue(of(null));

    component.deleteItem();

    expect(mockTeamService.deleteTeam).toHaveBeenCalledWith('1');
    expect(mockSnackBar.open).toHaveBeenCalledWith('team has been deleted', 'Dismiss', jasmine.any(Object));
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/teams');
  });

  it('should handle error on deleteItem', () => {
    mockTeamService.deleteTeam.and.returnValue(of(null));

    component.deleteItem();

    expect(mockSnackBar.open).toHaveBeenCalledWith('Cannot delete teams with undefined or null ID', 'Dismiss', jasmine.any(Object));
  });

  it('should navigate back on back', () => {
    component.back();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
