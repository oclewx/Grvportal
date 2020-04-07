# Implementation of Nested Functions for C Programs
This tool can be used to convert the nested functions into a source file which will behave as executing nested function in C language.
-------------------------------------

## This tool is tested on 
llvm version 11.0.0
and clang version 11.0.0

Note:- this tool will not work on llvm version 9.0.1

## Installation guide
1.  Go to llvm source directory (in my case it is llvm-project)
2. Now you can directly copy the folder **exeucte-nested-function** in **clang-tools-extra** directory

3. Now write following command for adding the subdirectory in CMakeLists.txt
```
echo 'add_subdirectory(execute-nested-function)' >>clang-tools-extra/CMakeLists.txt
```

4. Now go to build directory and build with the following command.
```
ninja
```
Note:- building tool may be different in your case

*************************************

## Running test cases
1. copy folder **testfiles** in build directory (paths are hardcoded according to this)

2. run following commands to run the test cases in one shot
```
cd testfiles
make
```

Now you can see test cases and modified test cases files , modified test cases files are the converted ones.

*************************************

### Some Questions
**Q1.** does my implementation handle recursively nested function blocks? <br />
**Answer:** Yes

**Q2.** Does my asst handle structs that are locally defined (i.e. defined inside the function)? <br />
**Answer:** Yes

**Q3.** Does my code handle the case where we have global and local var with same name and that is captured in nested function ? <br />
**Answer:** Yes

**Q4.** Do I pass all the variables to every closure or only the captured vars? <br />
**Answer:** Only the captured vars.

**Q5.** Can you handle multiple closures in same/different functions (not necessarily nested)? <br />
**Answer:** Yes

**Q6.** Do I explicitly pass global vars to the closure as well? <br />
**Answer:** Yes


### description of test cases
1. test1.c <br />
	This test case is same as mentioned in the assignment
2. test2.c <br />
	this test case shows working of recursively nested function blocks
3. test3.c <br />
	this test case shows working of locally defined structure
4. test4.c <br />
	this test case shows working of local var in presence of global
	var with the same name
5. test5.c <br />
	this test case shows that multiple closures are handled in a function
6. test6.c <br />
	this test case shows that multiple closures are handled in a function(nested)
7. test7.c <br />
	this test case shows multiple things
	* this shows working of multiple labels in different functions
	* this shows working of same label name in different functions
	* this shows working of same structure name in differnt functions

8.  test8.c <br />
	This test case shows support to pointer type in nested funciton
9.	test9.c <br />
	this test case shows working of array of structures
and eventually shows working of array

10. test10.c <br />
	this test case shows working of multidimensional array
