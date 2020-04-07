# Implementation of Nested Functions for C Programs
This tool can be used to convert the nested functions into a source file which will behave as executing nested function in C language.

## This tool is tested on 
llvm version 11.0.0
clang version 11.0.0

Note:- this tool will not work on llvm version 9.0.0

##Installation guide
1.  Go to llvm source directory (in my case it is llvm-project)
2. Now you can directly copy the folder exeucte-nested-function in clang-tools-extra directory

3. Now write following command for adding the subdirectory in CMakeLists.txt
```
echo 'add_subdirectory(execute-nested-function)' >>clang-tools-extra/CMakeLists.txt
```

4. Now go to build directory and build.
