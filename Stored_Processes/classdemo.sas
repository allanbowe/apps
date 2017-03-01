/* convert input table (macro variable) into (.sas7bdat) dataset */
%hfsGetDataset(H54sTable, SASTable);

/* use this user-provided data to "do stuff" in sas */
proc sql;
create table sendmeback as
  select a.*
  from sashelp.class a
  inner join SASTable b
  on a.sex=b.Filter;

/* send result back to SAS */
%hfsHeader;
%hfsOutDataset(SASDATA,work, sendmeback);
%hfsFooter;
