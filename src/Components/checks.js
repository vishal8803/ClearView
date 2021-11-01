function isEmpty(txt)
{
    if(txt.length==0)
    {
        return true ;
    }else
    {
        return false ;
    }
}

function isDigit(txt)
{
    if(/^[0-9]+/.test(txt))
    {
        return true ;
    }
    return false ;
}

function isAlphabet(txt)
{
    if(/^[a-z A-z]+$/.test(txt))
    {
        return true ;
    }
    return false ;
}

function isMobile(txt)
{
    if(txt.length!=10)
    {
        return false ;
    }
    if(/^[0-9]{10}/.test(txt))
    {
        return true ;
    }
    return false ;
}

function isEmail(txt)
{
    if(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(txt))
    {
        return true ;
    }
    return false ;
}

export {isEmpty,isDigit,isMobile,isEmail,isAlphabet} 