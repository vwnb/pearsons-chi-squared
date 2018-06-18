Wrapper for the beautiful chi-squared-test module wrapping the beautiful chi-squared module.

Accepts input as a 2-dimensional array representing a two-way categorical (nominal) contingency table.

Returned object includes:
* p (independence measure)
* Cramer's V (correspondence strength)
* degrees of freedom adjusted per Pearson's chi-squared test for independence

```
import pcst from 'pcstfi'
// IMPORTANT! Assumed that little to no cell counts are under 5.
// This test does not produce reliable values with extremely small cell counts (or as a rule of thumb, with small total samples)
// Todo: implement warning about this as in R package

var the_pee_value = pcst([[10,20,30][10,20,30][10,20,30]])
/*
{
    /* Helpers */
	this.colSums = []; // Column sums
	this.rowSums = []; // Row sums
	this.total; // Table sum
	this.contingencyArray = []; // Contingency table as 2D array
    this.expArray = []; // 2D Array of "expected frequencies", e.g. typical frequencies assuming distribution is normal
	this.degf; // Degrees of Freedom (DoF)
    this.degfdelta; // Abstracted for convenience: Number that must be reduced from the DoF of a 1D vector to get the actual DoF of a 2D table.


    /*~***~*
    *   Main measures
    *~***~*~***~*~***~*~***~*~***~*/

    // Strength measure. Cramer's V, e.g. the Chi-squared statistic normalized between 0 and 1.
    // How to read:
    //  - Under 0.015: Very little association.
    //  - Between 0.015 and 0.5: Mild to strong association.
    //  - Over 0.5: Redundant. The variables measure the same thing.
    this.cramersV; 

    // Independence measure. The p-value of Pearson's chi-squared test for independency
    // How to read:
    //  - Under 0.05: Statistically significant, table is not random
    //  - Over 0.05: No statistically significant conclusions can be drawn from the table
    this.pcst; 
}
*/
```