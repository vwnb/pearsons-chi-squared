
// Require generic Chi-squared test for 1D vector
var chiSquaredTest = require("chi-squared-test");

/* Pearson's Chi-squared test for independence. */
var PCSTFI = function(){

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

PCSTFI.prototype.setDF = function () {
    this.degf = (this.contingencyArray[0].length-1) * (this.contingencyArray.length-1)
};

PCSTFI.prototype.setRowSums = function()
{
    for (var i=0 ; i<this.contingencyArray.length ; i++)
    {
        var s = 1;
        for (var j=0 ; j<this.contingencyArray[0].length ; j++)
        {
            s += this.contingencyArray[i][j];
        }
        this.rowSums[i]=s;
    }
    return true
}


PCSTFI.prototype.setColSums = function()
{
    for (var j=0 ; j<this.contingencyArray[0].length ; j++)
    {
        var s = 1;
        for (var i=0 ; i<this.contingencyArray.length ; i++)
        {
            s += this.contingencyArray[i][j];
        }
        this.colSums[j]=s;
    }
    return true
}

PCSTFI.prototype.setSampleTotal = function()
{
    var s=0;
    for (var i=0 ; i<this.contingencyArray.length ; i++) 
    {
        var x=this.rowSums[i];   // get the next row sum
        s+=x;      // add it to the total
    }
    this.total=Number(s);
}     

PCSTFI.prototype.setExpArray = function()
{
    for (var i=0 ; i<this.contingencyArray.length ; i++)
    {
        this.expArray[i] = [];
        for (var j=0 ; j<this.contingencyArray[i].length ; j++)
        {
            this.expArray[i][j] = (this.rowSums[i] * this.colSums[j])/this.total;
        }
    }
}

PCSTFI.prototype.setCramersV = function(){
    var min = Math.min(this.contingencyArray.length-1, this.contingencyArray[0].length-1);
    this.cramersV = (min === 0) ? 0 : Math.sqrt(this.chiSquared/(this.total*min))
    return true;
}

PCSTFI.prototype.setPCST = function()
{

    this.pcst = 1;

    var flattenedContingencyArray =  [].concat.apply([], this.contingencyArray);
    var flattenedExpArray = [].concat.apply([], this.expArray);

    //reduce this number of degrees of freedom from a generic chi-square test
    this.degfdelta = flattenedContingencyArray.length - this.degf;

    this.pcst = chiSquaredTest(flattenedContingencyArray, flattenedExpArray, this.degfdelta);

}


PCSTFI.prototype.calculate = function(contingencyArray)
{
	this.contingencyArray = contingencyArray;
    this.setDF();
    this.setRowSums();
    this.setColSums();
    this.setSampleTotal();
    this.setExpArray();
    this.setPCST();
    this.setCramersV();
    return true
   
}

var pcstfi = new PCSTFI();

module.exports = function(contingencyArray){
    pcstfi.calculate(contingencyArray);
    return JSON.parse(JSON.stringify(pcstfi));
}