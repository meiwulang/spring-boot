package cn.evun.sweet.framework.core.mvc.controller.validation;

/**
 * Created by zlbbq on 16/6/14.
 */


import cn.evun.sweet.framework.common.tracer.ThreadLocalProcessTracer;
import io.swagger.annotations.ApiOperation;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.ConstraintViolation;
import javax.validation.Path;
import javax.validation.Valid;
import javax.validation.Validator;
import javax.validation.executable.ExecutableValidator;
import javax.validation.groups.Default;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

@Aspect
public class ControllerParameterValidationAspect {
//    private static final Logger logger = LoggerFactory.getLogger(ControllerParameterValidationAspect.class);

    private Validator validator;

    public ControllerParameterValidationAspect(Validator validator) {
        this.validator = validator;
    }

    @Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    private void controllerInvocation() {
    }

    @Around("controllerInvocation()")
    public Object aroundController(ProceedingJoinPoint joinPoint) throws Throwable {

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();
        Annotation [][]parameterAnnotations = method.getParameterAnnotations();
        Class[] argTypes = methodSignature.getParameterTypes();
        Object[] args = joinPoint.getArgs();
        String[] argNames = methodSignature.getParameterNames();

        //使请求跟踪中有能力输出ApiOperation的功能字符串
        ApiOperation apiOperationAnnotation = AnnotationUtils.findAnnotation(method, ApiOperation.class);
        if(apiOperationAnnotation != null) {
            String businessFunctionalityName = apiOperationAnnotation.nickname();
            if(!StringUtils.hasText(businessFunctionalityName)) {
                businessFunctionalityName = apiOperationAnnotation.value();
            }
            //这个属性将被加到Root段的属性中
            ThreadLocalProcessTracer tracer = ThreadLocalProcessTracer.get();
            tracer.setRootAttribute("operation", businessFunctionalityName);
        }

        if (hasValidAnnotation(method) && this.validator instanceof ExecutableValidator) {
            ExecutableValidator executableValidator = (ExecutableValidator) this.validator;
            Set<ConstraintViolation<Object>> constraintViolationSet = executableValidator.validateParameters(joinPoint.getTarget(), method, args, Default.class);
            if (!CollectionUtils.isEmpty(constraintViolationSet)) {
                Iterator<ConstraintViolation<Object>> iterator = constraintViolationSet.iterator();
                Map<String, String> errorInfo = new HashMap<>();
                while (iterator.hasNext()) {
                    ConstraintViolation<?> constraintViolation = iterator.next();
                    Path.Node last = null;
                    Iterator<Path.Node> p = constraintViolation.getPropertyPath().iterator();
                    while (p.hasNext()) {
                        last = p.next();
                    }
                    //Fixme : Hack
                    String str = last.toString();
                    int paramIndex = Integer.parseInt(str.substring(str.indexOf("arg") + 3));
                    errorInfo.put(this.getRequestParameterName(argNames[paramIndex], parameterAnnotations[paramIndex]), constraintViolation.getMessage());
                }
                throw new ControllerParameterValidationException(errorInfo);
            }
        }

        return joinPoint.proceed(joinPoint.getArgs());
    }

    private String getRequestParameterName(String methodParameterName, Annotation[] methodParameterAnnotations) {

        for (Annotation annotation : methodParameterAnnotations) {
            if (RequestParam.class.isInstance(annotation)) {
                RequestParam requestParam = (RequestParam) (annotation);
                String name = requestParam.name();
                String value = requestParam.value();
                if (StringUtils.hasText(value)) {
                    return value;
                }

                if (StringUtils.hasText(name)) {
                    return name;
                }
            }
        }

        return methodParameterName;
    }

    private boolean hasValidAnnotation(Method method) {
        Annotation[] annotations = method.getAnnotations();
        for (Annotation annotation : annotations) {
            if (Valid.class.isInstance(annotation)) {
                return true;
            }
        }
        return false;
    }

    public void setValidator(Validator validator) {
        this.validator = validator;
    }
}
